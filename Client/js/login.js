async function login(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // BELANGRIJK: pas hier uitlezen, op moment van klik
    const remember = document.getElementById('rememberMe').checked;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            remember
        })
    });

    const data = await response.json();

    if (response.ok) {
        // redirect na login
        window.location.href = '/overview.html';
    } else {
        // foutmelding tonen
        const error = document.getElementById('error');
        if (error) {
            error.textContent = data.fout;
            error.style.display = 'block';
        }
    }
}

// koppelen aan form submit
document.getElementById('loginForm').addEventListener('submit', login);