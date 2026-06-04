const cancelBtn = document.getElementById('cancelBtn');
const modal = document.getElementById('cancelModal');
const cancelKeepEditing = document.getElementById('cancelCancel');
const confirmCancel = document.getElementById('confirmCancel');

// Modal openen
if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });
}

// Verder aanpassen (modal sluiten)
if (cancelKeepEditing) {
    cancelKeepEditing.addEventListener('click', () => {
        modal.classList.remove('show');
    });
}

// Stoppen (terug naar overzicht)
if (confirmCancel) {
    confirmCancel.addEventListener('click', () => {
        window.location.href = '/overview.html';
    });
}

// Extra: klik buiten modal sluit ook
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});