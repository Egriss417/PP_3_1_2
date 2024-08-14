
document.addEventListener('DOMContentLoaded', async function () {
    await showUserEmailOnNavbar();
    await fillTableAboutUser();
});

async function dataAboutCurrentUser() {
    const response = await fetch("/api/admin/user");
    return await response.json();
}

async function fillTableAboutUser() {

    const currentUserTable = document.getElementById("currentUserTable");
    const currentUser = await dataAboutCurrentUser();


    let currentUserTableHTML = "";
    currentUserTableHTML +=
        `<tr>
            <td>${currentUser.id}</td> 
            <td>${currentUser.firstName}</td> 
            <td>${currentUser.lastName}</td> 
            <td>${currentUser.email}</td>
            <td>${currentUser.username}</td>
            <td>${currentUser.roles.map(role => role.name.slice(5)).join(' ')}</td>
        </tr>`;
    currentUserTable.innerHTML = currentUserTableHTML;
}

async function showUserEmailOnNavbar() {
    const currentUserEmailNavbar = document.getElementById("currentUserHeader");
    const currentUser = await dataAboutCurrentUser();
    currentUserEmailNavbar.innerHTML =
        `<strong>${currentUser.email}</strong> 
                 with roles: 
                 ${currentUser.roles.map(role => role.name.slice(5)).join(' ')}`;

}