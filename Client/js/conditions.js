const openTerms = document.getElementById('openTerms');
const closeTerms = document.getElementById('closeTerms');
const termsModal = document.getElementById('termsModal');

if (openTerms) {
    openTerms.addEventListener('click', (e) => {
        e.preventDefault();
        termsModal.classList.add('show');
    });
}

if (closeTerms) {
    closeTerms.addEventListener('click', () => {
        termsModal.classList.remove('show');
    });
}

// Sluiten bij klik buiten de popup
termsModal?.addEventListener('click', (e) => {
    if (e.target === termsModal) {
        termsModal.classList.remove('show');
    }
});