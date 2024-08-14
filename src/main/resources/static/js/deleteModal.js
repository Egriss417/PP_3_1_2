async function sendDataDeleteUser(id) {
    await fetch(`/api/admin/users/delete/${id}`,
        {method:"Delete",
            headers:{'Content-type':'application/json'}});
}

const modalDelete = document.getElementById("deleteModal");

async function deleteModalHandler() {
    await fillModal(modalDelete);
}

modalDelete.addEventListener("submit", async function (event) {
    event.preventDefault();
    const idUserDelete = document.getElementById("idDelete").value;

    await sendDataDeleteUser(idUserDelete);
    await fillTable();

    $('#deleteModal').modal('hide');
});