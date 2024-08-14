async function getUserDataById(userId) {
    const response = await fetch(`/api/admin/users/${userId}`);
    return await response.json();
}

async function getRoles(){
    const response = await fetch("/api/admin/roles");
    return await response.json();
}

async function fillModal(modal) {

    $(modal).on("show.bs.modal", async function (event) {
        const userId = $(event.relatedTarget).data('user-id');
        const user = await getUserDataById(userId);
        const modalBody = $(this).find(".modal-body");
        const idInput = modalBody.find("input[data-user-id='id']");
        const nameInput = modalBody.find("input[data-user-id='firstName']");
        const lastNameInput = modalBody.find("input[data-user-id='lastName']");
        const emailInput = modalBody.find("input[data-user-id='email']");
        const usernameInput = modalBody.find("input[data-user-id='username']");

        idInput.val(user.id);
        nameInput.val(user.firstName);
        lastNameInput.val(user.lastName);
        emailInput.val(user.email);
        usernameInput.val(user.username);

        let rolesSelect = modalBody.find("select[id='role']").length ? modalBody.find("select[id='role']") :
            modalBody.find("select[id='roleDelete']");

        let userRolesHTML = "";
        const roles = await getRoles();


        for(let role of roles){
            let hasRoleUser = user.roles.some(userRole => userRole.name === role.name);
            userRolesHTML += `<option value="${role.id}" ${hasRoleUser?"selected":""}>${role.name}</option>`
        }

        rolesSelect.html(userRolesHTML);
    });
}