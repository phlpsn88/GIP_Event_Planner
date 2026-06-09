async function init() {
    // Vraag de server: wie is er momenteel ingelogd?
    // GET /api/mij kijkt naar de sessie-cookie die de browser meestuurt.
    const response = await fetch('/api/mij');

    if (!response.ok) {
        // 401 = niet ingelogd → doorsturen naar loginpagina
        // Dit voorkomt dat niet-ingelogde bezoekers het dashboard zien
        window.location.href = '/login.html';
        return; // stop de functie
    }

    const gebruiker = await response.json();

    document.getElementById('event-form').addEventListener('submit', slaEventOp);
}

async function slaEventOp(e) {
    e.preventDefault();

        const formTitle = document.getElementById('title').value;
    const formDate = document.getElementById('date').value;

    if (formTitle === '' || formDate === '') {
        const titelFout = document.getElementById('titleError');
        const datumFout = document.getElementById('dateError');

        if (formTitle === '') {
            titelFout.hidden = false;
        } else {
            titelFout.hidden = true;
        }

        if (formDate === '') {
            datumFout.style.visibility = 'visible';
        } else {
            datumFout.style.visibility = 'hidden';
        }

        return;
    }

    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        event_date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        status: parseInt(document.getElementById('status').value),
    };

    const response = await fetch('/api/events', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
        window.location.href = '/overview.html';
    } else {
        const fout = document.getElementById('foutmelding');
        fout.textContent = data.fout;
        fout.hidden = false;
    }
}

const form = document.getElementById('event-form');

if (form) {
    form.addEventListener('submit', slaEventOp);
}

init();