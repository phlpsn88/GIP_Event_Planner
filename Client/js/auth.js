// Client/js/auth.js
// Dit bestand wordt geladen op zowel register.html als login.html.
// Elke sectie controleert eerst of het formulier op de huidige pagina bestaat.

// ── Registratie ───────────────────────────────────────────────────────────────
const registerForm = document.getElementById('registerForm');
const fout = document.getElementById('foutmelding');

// Email validatie functie
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Alleen uitvoeren als we op register.html zijn (anders is registerForm null)
if (registerForm) {
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    registerForm.addEventListener('submit', async (e) => {
        // e.preventDefault() voorkomt dat het formulier de pagina herlaadt
        e.preventDefault();

        const username = document.getElementById('naam').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('wachtwoord').value;
        const acceptedTerms = document.getElementById('terms').checked;

        fout.hidden = true;
        fout.textContent = "";

        if (!isValidEmail(email)) {
            fout.textContent = "Gelieve een geldige email in te vullen";
            fout.hidden = false;
        } else if (!acceptedTerms) {
            fout.textContent = "Gelieve de voorwaarden te accepteren"; // tekst weergeven als foutmelding
            fout.hidden = false; // element zichtbaar maken
        } else {
            // fetch() stuurt een POST-request naar de server
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },    // vertel de server dat we JSON sturen
                body: JSON.stringify({ username, email, password }) // zet JS-object om naar JSON tekst
            });
            const data = await response.json();
    
            if (response.ok) {
                // response.ok = true als de statuscode 200-299 is (hier: 201)
                // Registratie gelukt → doorsturen naar loginpagina
                window.location.href = '/login.html';
            } else {
                // Fout (bv. e-mail al in gebruik) → toon de foutmelding
                fout.textContent = data.fout;   // tekst van de server instellen
                fout.hidden = false;            // element zichtbaar maken
            }
        }
    });
}

// ── Login ─────────────────────────────────────────────────────────────────────
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            window.location.href = data.role == 'admin' ? '/admin.html' : '/overview.html';
        } else {
            fout.textContent = data.fout;
            fout.hidden = false;
        }
    });
}