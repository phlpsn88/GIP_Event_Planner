import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import session from 'express-session';
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.static('../Client'));

app.use(express.json());

app.use(session({
    secret: 'geheim',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 4
    }
}));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const [rows] = await pool.query("SELECT DATABASE() as db");
console.log("Connected to database:", rows[0].db);

// ── POST /api/register — nieuw account aanmaken ────────────────────────────────
app.post('/api/register', async (req, res) => {
    // req.body bevat de JSON die het registratieformulier meestuurde
    const { username, email, password } = req.body;

    // Validatie: zijn alle verplichte velden ingevuld?
    if (!username || !email || !password) {
        return res.status(400).json({ fout: 'Alle velden zijn verplicht' });
    }
    if (password.length < 8) {
        return res.status(400).json({ fout: 'Wachtwoord moet minstens 8 tekens zijn' });
    }

    // Controleer of dit e-mailadres al in gebruik is
    const [bestaande] = await pool.execute(
        'SELECT ID FROM users WHERE email = ?', [email]
    );
    if (bestaande.length > 0) {
        // 409 Conflict: het e-mailadres is al bezet
        return res.status(409).json({ fout: 'E-mailadres is al in gebruik' });
    }

    // bcrypt.hash(wachtwoord, 10):
    //   - wachtwoord: de leesbare tekst die de gebruiker intypte
    //   - 10: het aantal "salt rounds" — hoe meer rounds, hoe veiliger maar trager.
    //         10 is de industriestandaard: veilig én snel genoeg voor login.
    // De hash ziet er zo uit: '$2b$10$...' (altijd 60 tekens lang)
    const hash = await bcrypt.hash(password, 10);

    // Sla de gebruiker op — nooit het originele wachtwoord, altijd de hash!
    // rol hoeven we niet mee te geven: de database gebruikt DEFAULT 'Gebruiker'
    const [user] = await pool.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash]
    );

    // 201 Created: account succesvol aangemaakt
    // r.insertId = het AUTO_INCREMENT-id van de nieuwe gebruiker
    res.status(201).json({ id: user.insertId, bericht: 'Account aangemaakt' });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const [rijen] = await pool.execute(
        'SELECT * FROM users WHERE email = ?', [email]
    );

    if (rijen.length === 0) {
        return res.status(401).json({ fout: 'Ongeldig e-mailadres of wachtwoord' });
    }

    const gebruiker = rijen[0];

    const klopt = await bcrypt.compare(password, gebruiker.password);
    if (!klopt) {
        return res.status(401).json({ fout: 'Ongeldig e-mailadres of wachtwoord' });
    }

    req.session.gebruikerId = gebruiker.id;
    req.session.username = gebruiker.username;
    req.session.role = gebruiker.role;

    res.json({ bericht: 'Ingelogd', naam: gebruiker.username, rol: gebruiker.role });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ bericht: 'Uitgelogd' });
    });
});

app.listen(port, () => {
    console.log('server gestart -> http://localhost:' + port);
});