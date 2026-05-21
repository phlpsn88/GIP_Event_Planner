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
}

let eventCache = [];

async function laadEvents() {
    const response = await fetch('/api/mijn-events');
    const events = await response.json();
    eventCache = events;
    const container = document.getElementById('events-overview');

   if (events.length === 0) {
        container.innerHTML = '<p>je hebt nog geen evenementen toegevoegd.</p>';
        return;
    }

    container.innerHTML = `
    ${events.map(e => `
        <article class="event-card" data-event-id="${e.id}">
            <div class="event-main">
                <h3 class="event-title">${e.title}</h3>
                <p class="description">${e.description || ''}</p>
            </div>

            <div class="event-meta">
                <span class="date">${new Date(e.date).toLocaleDateString('nl-BE')}</span>
                <span class="location">${e.location || '-'}</span>
            </div>

           <div class="event-footer">
                <span class="status active">${e.status}</span>
                <div class="actions">
                    <a href="edit_event.html" title="Event aanpassen" data-id="${e.id}">
                        <i class="fa-regular fa-pen-to-square edit"></i>
                    </a>
                    <button class="delete-btn" title="Event verwijderen" data-id="${e.id}">
                        <i class="fa-regular fa-trash-can delete"></i>
                    </button>
                </div>
            </div>
        </article> 
        `).join('')}
    `;
}