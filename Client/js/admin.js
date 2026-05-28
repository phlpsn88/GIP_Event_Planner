async function init() {
    const res = await fetch('/api/mij');
    if (!res.ok) { window.location.href = '/login.html'; return; }
    const gebruiker = await res.json();
    if (gebruiker.role !== 'admin') { window.location.href = '/overview.html'; return; }
    laadEvents();
}

// async function laadEvents() {
//     const res = await fetch('/api')
// }