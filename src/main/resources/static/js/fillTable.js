document.addEventListener('DOMContentLoaded',async function() {
    await fillTable();
})

async function getUsers(){
    let response = await fetch("/api/admin/users");
    return response.json();
}

async function fillTable() {
    const usersTable = document.getElementById("usersTableData");
    const users = await getUsers();

    let userTbodyHtml = "";
    for (let user of users) {
        userTbodyHtml +=
            `<tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>      
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.roles.map(role => role.name.slice(5)).join(' ')}</td>
                <td>
                    <button class="btn btn-info btn-sm text-white"
                            data-toggle="modal"
                            data-target="#editModal"
                            data-user-id="${user.id}"
                            onclick=editModalHandler()>
                        Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm btn-delete"
                            data-toggle="modal"
                            data-target="#deleteModal"
                            data-user-id="${user.id}"
                            onclick=deleteModalHandler()>                     
                        Delete</button>
                </td>
            </tr>`;
    }
    usersTable.innerHTML = userTbodyHtml;
}