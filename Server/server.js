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

app.get('/api/gip_test', (req, res) => {
    res.json({ bericht: 'server werkt' });
});

app.listen(port, () => {
    console.log('server gestart -> http://localhost:' + port);
});