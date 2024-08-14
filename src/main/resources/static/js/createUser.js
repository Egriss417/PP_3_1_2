document.addEventListener('DOMContentLoaded',async function() {
    await fillRoles();
})
document.getElementById("formAdd").addEventListener("submit",createNewUser);

async function sendDataNewUser(user) {
    await fetch("/api/admin/users/create",
        {method:"POST",
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(user)});
}

async function fillRoles(){
    const roles = await getRoles();
    let roleNewUser = document.getElementById("roleCreate");
    let userRolesHTML = "";
    for(let role of roles){
        userRolesHTML += `<option value="${role.id}">${role.name.slice(5)}</option>`
    }

    roleNewUser.innerHTML = userRolesHTML;
}



async function createNewUser(e){
    e.preventDefault();
    const roleNewUser = document.getElementById("roleCreate");

    let roles = [];
    for (let option of roleNewUser.selectedOptions) {
        roles.push({id:option.value, name: option.text});
    }

    const firstNameElement =  document.getElementById("firstNameCreate");
    const lastNameElement =  document.getElementById("lastNameCreate");
    const emailElement =  document.getElementById("emailCreate");
    const usernameElement =  document.getElementById("usernameCreate");
    const passwordElement =  document.getElementById("passwordCreate");

    let user = {
        firstName: firstNameElement.value,
        lastName: lastNameElement.value,
        email: emailElement.value,
        username: usernameElement.value,
        password: passwordElement.value,
        roles: roles
    }
    await sendDataNewUser(user);
    await fillTable();

    firstNameElement.value = "";
    lastNameElement.value = "";
    emailElement.value = "";
    usernameElement.value = "";
    passwordElement.value = "";
    roleNewUser.value = "";
}