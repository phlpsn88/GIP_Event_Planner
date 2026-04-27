const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const naam = document.getElementById('naam').value;
        const email = document.getElementById('email').value;
        const wachtwoord = document.getElementById('wachtwoord').value;

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ naam, email, wachtwoord})
        });
        const data = await response.json();

        if (response.ok) {
            window.location.href = '/login.html';
        } else {
            const fout = document.getElementById('foutmelding');
            fout.textContent = data.fout;
            fout.hidden = false;
        }
    });
}