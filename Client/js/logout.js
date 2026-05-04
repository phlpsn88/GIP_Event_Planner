const logoutButton = document.querySelector('#logoutButton');

logoutButton.addEventListener('click', async () => {
    const response = await fetch('/api/logout', {
        method: 'POST'
    })

    if (response.ok) {
        window.location.href = '/index.html';
    }
});