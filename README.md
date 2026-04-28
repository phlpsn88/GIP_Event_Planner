# Event Planner: VisionEvents
De Event Planner is een webapplicatie waarmee gebruikers evenementen kunnen aanmaken, beheren en bekijken.  
De applicatie is gebouwd met Node.js, Express en MySQL.

## Functionaliteiten
- Account registreren en inloggen
- Evenementen aanmaken, bewerken en verwijderen
- Overzicht van al je evenementen bekijken
- Database opslag via MySQL

## Vereisten:
Zorg dat de volgende software geïnstalleerd is:
- Node.js
- npm
- MySQL
- Git

## Installatie
1. Clone de repository:
    `git clone https://github.com/phlpsn88/GIP_Event_Planner.git`

2. Ga naar de projectmap:
    `cd GIP_Event_Planner`

3. Installeer de dependencies:
    `npm install`

4. Maak een .env bestand aan in de root van het project en voeg toe:
    `DB_HOST=localhost`
    `DB_USERS=root`
    `DB_PASSWORD=`
    `DB_NAME=event_planner`

5. Start de server:
    `npm start`

## Database opzetten
1. Open MySQL

2. Importeer het SQL bestand:
    `event_planner_db.sql`

## Gebruik
1. Open je browser en ga naar:
    http://localhost:3000

2. Maak een account aan.

3. Log in.

4. Klik op "Evenementen beheren" om naar de overzichtspagina te gaan. Hier kan je eventementen aanmaken, aanpassen en verwijderen.

## Technologieën
- Node.js
- Express
- MySQL
- HTML / CSS / JavaScript

## Auteurs
Quinten Maquoi
Ash van Puyvelde

GIP Applicatie- en Databeheer