async function sendDataEditUser(user) {
    await fetch("/api/admin/users/update",
        {method:"PUT",
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(user)});
}

const modalEdit = document.getElementById("editModal");

async function editModalHandler() {
    await fillModal(modalEdit);
}

modalEdit.addEventListener("submit", async function (event) {
    event.preventDefault();

    const rolesSelected = document.getElementById("role");

    let roles = [];
    for (let option of rolesSelected.selectedOptions) {
            roles.push({id:option.value, name: option.text});
    }
    console.log(roles)
    let user = {
        id: document.getElementById("id").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        roles: roles
    }

    await sendDataEditUser(user);
    await fillTable();

    $('#editModal').modal('hide');
});