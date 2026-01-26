const deleteButtons = document.querySelectorAll('.delete');
const modal = document.querySelector('#deleteModal');
const cancelBtn = document.getElementById('cancelDelete');
const confirmBtn = document.getElementById('confirmDelete');

// open modal
deleteButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        modal.classList.add("show");
    });
});

// Cancel
cancelBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

// Confirm delete
confirmBtn.addEventListener("click", () => {
    console.log("Event verwijderen");

    modal.classList.remove("show");
});
