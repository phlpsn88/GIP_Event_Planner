# 🎉 Event Planner: VisionEvents
De Event Planner is een webapplicatie waarmee gebruikers evenementen kunnen aanmaken, beheren en bekijken.  
De applicatie is gebouwd met **Node.js**, **Express** en **MySQL**.

## Functionaliteiten

### Authenticatie
- Account registreren en inloggen
- Login is sessie-gebaseerd
- Optie "Onthoud mij" (blijft 7 dagen ingelogd)

### Evenementenbeheer
- Evenementen aanmaken, bewerken en verwijderen
- Overzicht van eigen evenementen

### Admin functies
- Admin-gebruiker met extra rechten
- Kan alle evenementen van alle gebruikers bekijken
- Kan alle evenementen beheren (CRUD)

### Database
- Opslag via MySQL voor gebruikers en evenementen

## ⚙️ Vereisten:
Zorg dat de volgende software geïnstalleerd is:
- Node.js
- npm
- MySQL
- Git

## 🚀 Installatie
1. Clone de repository:
    `git clone https://github.com/phlpsn88/GIP_Event_Planner.git`

2. Ga naar de projectmap:
    `cd GIP_Event_Planner/Server/`

3. Installeer de dependencies:
    `npm install`

4. Maak een .env bestand aan in de Server-map van het project en voeg toe:
    `DB_HOST='localhost'`
    `DB_PORT=3306`
    `DB_USER='jouw_username'`
    `DB_PASSWORD='jouw_wachtwoord'`
    `DB_NAME='event_planner'`

5. Zet de database op:
    1. Open MySQL

    2. Importeer het SQL bestand:
    `event_planner_db.sql`

6. Maak de admin aan:
    1. Genereer een bcrypt-hash van je gewenste wachtwoord door dit in je terminal uit te voeren:
    ```bash
    node -e "import('bcrypt').then(b => b.default.hash('gekozen_wachtwoord', 10).then(h => console.log(h)))"
    ```

    2. Kopieer de hash en voer dit uit in MySQL Workbench:
    ```sql
    UPDATE users
    SET password = '$2b$10$...(kopieer hash hier)...', role = 'admin'
    WHERE email = 'admin@visionevents.be';
    ```

7. Start de server:
    `npm start`
    Dit start `server.js`.

## 📖 Gebruik
1. Open je browser en ga naar:
    http://localhost:3000

2. Maak een account aan via de knop "registreer nu".

3. Je wordt doorgestuurd naar de login pagina, log in met je gegevens.
    - Als je "onthoud mij" aanvinkt blijf je aangemeld tot 7 dagen nadat je ingelogd hebt.
    - Zonder "onthoud mij" blijf je ingelogd zolang de browser geopend is.

4. Je komt terecht op de overzichtspagina. Hier kan je evenementen aanmaken, aanpassen en verwijderen.

5. Uitloggen kan via het icoon in de rechterbovenhoek.

## 🧰 Technologieën
- Node.js
- Express
- MySQL
- HTML / CSS / JavaScript

## 👨‍💻 Auteurs
Quinten Maquoi
Ash van Puyvelde

GIP Applicatie- en Databeheer