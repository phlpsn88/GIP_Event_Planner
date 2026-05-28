const modal = document.getElementById('deleteModal');
const cancelBtn = document.getElementById('cancelDelete');
const confirmBtn = document.getElementById('confirmDelete');

// Cancel
cancelBtn.addEventListener("click", () => {
    // Remove class "show" from modal
    modal.classList.remove("show");
});

// Confirm delete
confirmBtn.addEventListener("click", async () => {
    if (!selectedEventId) return;

    await fetch('/api/events/' + selectedEventId, {
        method: 'DELETE'
    });

    modal.classList.remove("show");
    laadEvents();
});