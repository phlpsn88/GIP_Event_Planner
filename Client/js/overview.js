async function init() {
    const response = await fetch('/api/mij');

    if (!response.ok) {
        window.location.href = '/login.html';
        return;
    }

    const gebruiker = await response.json();
    document.getElementById('userName').textContent = gebruiker.username;

    if (gebruiker.role === 'admin') {
        window.location.href = '/admin.html';
        return;
    }

    laadEvents();

    document.getElementById('logoutButton').addEventListener('click', async () => {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/login.html';
    });
}

let eventCache = [];

async function laadEvents() {
    const response = await fetch('/api/mijn-events');
    const events = await response.json();
    eventCache = events;
    const container = document.getElementById('events-overview');

   if (events.length === 0) {
        container.innerHTML = '<p>Je hebt nog geen evenementen toegevoegd.</p>';
        return;
    }

    container.innerHTML = `
    ${events.map(e => `
        <article class="event-card">
            <div class="event-main">
                <h3 class="event-title">${e.title}</h3>
                <p class="description">${e.description || '-'}</p>
            </div>

            <div class="event-meta">
                <span class="date">${new Date(e.event_date).toLocaleDateString('nl-BE')}</span>
                <span class="location">${e.location || '-'}</span>
            </div>

           <div class="event-footer">
                <span class="status ${e.status ? "active": "canceled"}">${e.status ? "Actief" : "Geannuleerd"}</span>
                <div class="actions">
                    <a href="edit_event.html?id=${e.ID}" title="Event aanpassen" data-id="${e.ID}">
                        <i class="fa-regular fa-pen-to-square edit"></i>
                    </a>
                    <button class="delete-btn" title="Event verwijderen" data-actie="verwijderen" data-id="${e.ID}">
                        <i class="fa-regular fa-trash-can delete"></i>
                    </button>
                </div>
            </div>
        </article> 
        `).join('')}
    `;
}

let selectedEventId = null;
const modal = document.getElementById('deleteModal');
const cancelBtn = document.getElementById('cancelDelete');
const confirmBtn = document.getElementById('confirmDelete');

document.getElementById('events-overview').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-actie="verwijderen"]');
    if (!btn) return;
    
    selectedEventId = btn.dataset.id;
    modal.classList.add('show');
});

// Cancel delete
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

document.getElementById('logoutButton').addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login.html';
});

init();