import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import session from 'express-session';

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
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'event_planner'
});

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ fout: 'Alle velden zijn verplicht' });
    }
    if (password.length < 8) {
        return res.status(400).json({ fout: 'Wachtwoord moet minstens 8 tekens zijn' });
    }

    const [bestaande] = await pool.execute(
        'SELECT ID FROM users WHERE email = ?', [email]
    );
    if (bestaande.length > 0) {
        return res.status(409).json({ fout: 'E-mailadres is al in gebruik' });
    }

    const hash = await bcrypt.hash(password, 10);

    const [user] = await pool.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash]
    );

    res.status(201).json({ id: user.insertId, bericht: 'Account aangemaakt' });
});

app.get('/api/gip_test', (req, res) => {
    res.json({ bericht: 'server werkt' });
});

app.listen(port, () => {
    console.log('server gestart -> http://localhost:' + port);
});