async function init() {
    const response = await fetch('/api/mij');

    // Niet ingelogd: login + registreerknoppen
    if (!response.ok) {
        return;
    }

    const gebruiker = await response.json();
    const navButtons = document.getElementById('navButtons');

    navButtons.classList.add('logged-in')

    navButtons.innerHTML = `
    <div class="user">
        <span class="username" id="userName">
            ${gebruiker.username}
        </span>
        <div class="logout-button" title="Log uit">
            <a id="logoutButton">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </a>
        </div>
    </div>
    `;

    document.getElementById('logoutButton').addEventListener('click', async () => {
        await fetch('/api/logout', { method: 'POST' });

        window.location.href = '/login.html';
    });
}

init();