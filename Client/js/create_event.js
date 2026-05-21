async function init() {
    // Vraag de server: wie is er momenteel ingelogd?
    // GET /api/mij kijkt naar de sessie-cookie die de browser meestuurt.
    const response = await fetch('/api/mij');
    alert(response);

    if (!response.ok) {
        // 401 = niet ingelogd → doorsturen naar loginpagina
        // Dit voorkomt dat niet-ingelogde bezoekers het dashboard zien
        window.location.href = '/login.html';
        return; // stop de functie — de rest mag niet uitgevoerd worden
    }

    const gebruiker = await response.json();
    alert(gebruiker.username);
}

async function slaEventOp(e) {
    e.preventDefault();

    console.log("submit fired");

    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        event_date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        status: document.getElementById('status').value,
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