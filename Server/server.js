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
        httpOnly: true
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

function vereisLogin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ fout: 'Inloggen vereist' });
    }
    next();
}

function isAdmin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ fout: 'Inloggen vereist' });
    }
    if (req.session.role !== 'admin') {
        return res.status(403).json({ fout: 'Geen toegang' });
    }
    next();
}

app.get('/api-admin/events', vereisLogin, async (req, res) => {
    const rijen = await pool.execute(`
        SELECT
            e.*,
            u.username AS aangemaakt_door
        FROM events e
        LEFT JOIN users u ON u.ID = e.user_id
        ORDER BY e.event_date ASC
        `);
        res.json(rijen[0]);
});

app.get('/api/events/:ID', vereisLogin, async (req, res) => {
    const [rijen] = await pool.execute(
        'SELECT * FROM events WHERE ID = ?',
        [req.params.ID]
    );
    res.json(rijen[0]);
});

// ── GET /api/mijn-events — alleen eigen events ───
app.get('/api/mijn-events', vereisLogin, async (req, res) => {
    const [rijen] = await pool.execute(
        'SELECT * FROM events WHERE user_id = ? ORDER BY event_date ASC',
        [req.session.userId]
    );
    res.json(rijen);
});

// ── POST /api/events — nieuwe event aanmaken ──────
app.post('/api/events', vereisLogin, async (req, res) => {
    const { title, description, event_date, location, status } = req.body;

    if (!title || !event_date ) {
        return res.status(400).json({ fout: 'Titel en datum zijn verplicht' });
    }
    const [resultaat] = await pool.execute(
        `INSERT INTO events
        (title, description, event_date, location, status, user_id)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description || null, event_date, location || null, status || 1, req.session.userId]
    );
    res.status(201).json({ id: resultaat.insertId, bericht: 'Evenement aangemaakt' });
});

// ── PUT /api/events/:ID
app.put('/api/events/:ID', vereisLogin, async (req, res) => {
    const { title, description, event_date, location, status } = req.body;

    const isAdmin = req.session.role === 'admin';

    let query;
    let params;

    if (isAdmin) {
        query = `
        UPDATE events
        SET title=?, description=?, event_date=?, location=?, status=?
        WHERE ID=?
        `;
        params = [
            title,
            description || null,
            event_date,
            location || null,
            status,
            req.params.ID
        ];
    } else {
        query = `
        UPDATE events
        SET title=?, description=?, event_date=?, location=?, status=?
        WHERE ID=?
        `;
        params = [
            title,
            description || null,
            event_date,
            location || null,
            status,
            req.params.ID,
            req.session.userId
        ];
    }

    const [result] = await pool.execute(query, params);

    if (result.affectedRows === 0) {
        return res.status(403).json({ fout: "Geen toegang tot dit event" });
    }
    
    res.json({ bericht: "Event bijgewerkt" });
});

// ── DELETE — eigen activiteit verwijderen
app.delete('/api/events/:ID', vereisLogin, async (req, res) => {
    const isAdmin = req.session.role === 'admin';

    let query;
    let params;

    if (isAdmin) {
        query = 'DELETE FROM events WHERE ID=?';
        params = [req.params.ID];
    } else {
        query = 'DELETE FROM events WHERE ID=? AND user_id=?';
        params = [req.params.ID, req.session.userId];
    }

    const [resultaat] = await pool.execute(query, params);

    if (resultaat.affectedRows === 0) {
        return res.status(403).json({ fout: 'Activiteit niet gevonden of geen toegang' });
    }
    res.status(204).end();
});

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
    const { email, password, remember } = req.body;

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
    
    req.session.userId = gebruiker.ID;
    req.session.username = gebruiker.username;
    req.session.role = gebruiker.role;

    // "onthoud mij" logica
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
    } else {
        req.session.cookie.maxAge = null;
    }

    req.session.save(() => {
        res.json({
            bericht: 'Ingelogd',
            naam: gebruiker.username,
            rol: gebruiker.role
        });
    });
});

// ── POST /api/logout — uitloggen ───────────────────────────────────────────────
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ bericht: 'Uitgelogd' });
    });
});

app.get('/api/mij', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ fout: 'Niet ingelogd' });
    }
    res.json({ id: req.session.userId, username: req.session.username, role: req.session.role });
});

app.listen(port, () => {
    console.log('server gestart -> http://localhost:' + port);
});