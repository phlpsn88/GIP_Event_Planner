// ── Stap 1: id uit de URL lezen ───────────────────────────────────────────────
// De URL ziet er zo uit: edit.html?id=5
// window.location.search geeft '?id=5' terug
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // '5' (altijd een string)

// Geen id in de URL → ongeldige toegang, terug naar overzicht
if (!id) { window.location.href = '/overview.html'; }

async function init() {
    const checkRes = await fetch('/api/mij');
    if (!checkRes.ok) { window.location.href = '/login.html'; return; }

    const eventRes = await fetch('/api/events/' + id);
    if (!eventRes.ok) {
        // Activiteit bestaat niet → terug naar overzicht
        // window.location.href = '/overview.html';
        return;
    }

    const event = await eventRes.json();

    let d = new Date(event.event_date);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];

    // ── Stap 3: formulier invullen met de ontvangen data ─────────────────────
    // Elk veld krijgt de waarde die van de server komt
    document.getElementById('title').value = event.title;
    document.getElementById('description').value = event.description || '';
    document.getElementById('date').value = local;
    document.getElementById('location').value = event.location || '';
    document.getElementById('status').value = event.status;
}

// ── Stap 4: formulier opslaan via PUT ─────────────────────────────────────────
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formTitle = document.getElementById('title').value;
    const formDate = document.getElementById('date').value;

    if (formTitle === '') {
        const titelFout = document.getElementById('titleError');

        titelFout.hidden = false;
    }

    if (formDate === '') {
        const datumFout = document.getElementById('dateError');

        datumFout.hidden = false;
    }

    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        event_date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        status: parseInt(document.getElementById('status').value),
    };

    const res = await fetch('/api/events/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (res.ok) {
        window.location.href = '/overview.html';
    }
});

init();