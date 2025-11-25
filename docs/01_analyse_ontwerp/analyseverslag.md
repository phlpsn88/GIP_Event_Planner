# Event planner analyseverslag

## Doel?
Duidelijke, overzichtelijke en gebruiksvriendelijke weergave van events & planning.

## Voor wie?
Organisatoren en mensen die een gemakkelijkere manier zoeken om events bij te houden.

## Functionele analyse

### Must-have

#### Frontend

##### **Homepagina**
- Header (niet ingelogd)
  - Logo → homepagina
  - Loginknop → loginpagina
  - Registreerknop → registreerpagina
- Header (ingelogd)
  - Logo → homepagina
  - Knop "Naar events"→ overzichtspagina
- Uitleg over de Event Planner

##### **Loginpagina**
- Inputvelden:
  - Username/e-mail
  - Wachtwoord
- Knop "Log in"

##### **Registreerpagina**
- Inputvelden:
  - Username/e-mail
  - Wachtwoord
- Knop "Registreer"

##### **Overzichtspagina Events (enkel ingelogd)**
- Header
  - Logo → homepagina
  - Welkom (username)
  - Knop "Uitloggen"
- Tabel met events:
  - Titel, Beschrijving, Datum, Locatie, Status
  - Knop "Edit" → event aanpassen
  - Knop "Verwijder" → bevestigingspopup
- Knop "Nieuw event" → event aanmaken

##### **Event aanmaken (enkel ingelogd)**
- Header:
  - Logo → homepagina
- Inputvelden:
  - Titel (verplicht)
  - Omschrijving
  - Datum (verplicht)
  - Locatie (verplicht)
  - Status (default: Actief)
- Knop "Event aanmaken" → succes/foutmelding

##### **Event aanpassen (enkel ingelogd)**
- Header:
  - Logo → homepagina
- Inputvelden (geladen met bestaande data):
  - Titel, Omschrijving, Datum, Locatie, Status
- Knop "Wijzigingen opslaan" → succes/foutmelding

##### **Footer (elke pagina)**
- Auteurs/copyright
- Contactinformatie en socials
- Over ons

#### Backend

##### **Gebruikersrollen**
- Gewone gebruiker
    - Kan eigen evenementen bekijken, aanmaken, aanpassen, verwijderen
- Admin gebruiker
    - Kan alle evenementen bekijken, aanpassen, verwijderen

##### **Authenticatie**
- Registreren nieuwe gebruiker
- Inloggen met sessie of token
- Uitloggen
- Wachtwoord hashing (SHA-256)
- Validatie van invoer

##### **Events**
- CRUD-operaties:
  - Create: nieuw event opslaan
  - Read: lijst tonen van alle events van gebruiker
  - Update: eventgegevens bijwerken
  - Delete: event verwijderen
- Datavalidatie:
  - Verplichte velden (titel, datum, locatie)
  - Datumcontrole

##### **Database**
- Tabel `users`
- Tabel `events`
- Relatie user → events (1-n)

---

### Nice-to-have

#### Frontend

##### **Mobile-friendly design**
- Responsive layout
- Menu’s en knoppen geoptimaliseerd voor mobiel

##### **Pagina “Profiel”**
- Knop "Profiel" in header
- Weergave van:
  - Username
  - Email
- Knop “Uitloggen”
- Header bevat enkel logo en welkom-boodschap

##### **Pagina “Wachtwoord wijzigen”**
- Input: huidig wachtwoord
- Input: nieuw wachtwoord + bevestiging
- Knop “Opslaan”
- Validatie: nieuw wachtwoord ≠ oud wachtwoord

#### Backend

##### **Profielbeheer**
- Ophalen van gebruikersinformatie
- Endpoints voor wachtwoord wijzigen (met correcte validatie)

##### **Extra validaties**
- Sterktecontroles voor wachtwoorden
- Unieke username/email checks met duidelijke foutmeldingen
