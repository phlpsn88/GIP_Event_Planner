# 🎓 GIP-Dossier – 6e Middelbaar Applicatie- en Databeheer  
## Project: **Event Planner Pro**

---

**Naam leerlingen:** Quinten, Ash 
**Klas:** 6ADB  
**School:** Appschool Munsterbilzen  
**Schooljaar:** 2025 – 2026  
**Leerkracht-begeleider:** Philipsen Wout  

---

## 📑 Inhoudsopgave
1. [Algemene projectbeschrijving](#-1-algemene-projectbeschrijving)  
2. [Technische specificaties](#-2-technische-specificaties)  
3. [Functionele vereisten](#-3-functionele-vereisten)  
4. [Datamodel](#-4-datamodel-voorbeeld)  
5. [Koppeling met leerplandoelen](#-5-koppeling-met-leerplandoelen)  
6. [Fasering & planning](#-6-fasering--planning)  
7. [Rollen en verantwoordelijkheden](#-7-rollen-en-verantwoordelijkheden)  
8. [Evaluatiematrix](#-8-evaluatiematrix)  
9. [Oplevermomenten](#-9-oplevermomenten)  
10. [Eindproducten](#-10-eindproducten)  
11. [Reflectievragen](#-11-reflectievragen-voor-leerlingen)  
12. [Ondertekening](#-12-ondertekening)

---

## 🧩 1. Algemene projectbeschrijving
De leerlingen ontwerpen en ontwikkelen een **webapplicatie voor evenementenbeheer**: *Event Planner Pro*.  
De applicatie helpt organisatoren om **evenementen te plannen, beheren en opvolgen**.  

Elke gebruiker kan zich registreren, inloggen en eigen evenementen beheren.  
De data wordt opgeslagen in een relationele databank en gekoppeld aan een eenvoudige, gebruiksvriendelijke webinterface.

---

## ⚙️ 2. Technische specificaties
| Component | Technologie |
|------------|--------------|
| **Front-end** | HTML & CSS |
| **Back-end** | PHP (met eenvoudige OOP-structuur) |
| **Databank** | MySQL (via PHPMyAdmin) |
| **Versiebeheer** | GitHub |
| **Optioneel** | Python voor dataverwerking of export |

---

## 🧱 3. Functionele vereisten
1. **Gebruikersbeheer**
   - Registratie en login (met wachtwoordhashing)  
   - Elke gebruiker ziet enkel zijn eigen evenementen  
   - Admin-gebruiker die alle evenementen kan raadplegen  

2. **Evenementbeheer (CRUD)**
   - Evenementen toevoegen, bewerken, verwijderen en markeren als “actief” of “geannuleerd”  
   - Velden: titel, omschrijving, datum, locatie, status  

3. **Overzichtspagina account**
   - Weergave van gebruikersgegevens  
   - Mogelijkheid om wachtwoord aan te passen  

4. **Rapporteringsfunctionaliteit**
   - Aantal evenementen per status (actief/geannuleerd)  
   - Export naar CSV-bestand  

---

## 🧾 4. Datamodel (voorbeeld)

**Tabel `users`**

| id | username | password |
|----|-----------|-----------|

**Tabel `events`**

| id | user_id | title | description | event_date | location | status |
|----|----------|--------|-------------|-------------|-----------|---------|

---

## 🎯 5. Koppeling met leerplandoelen

| Leerplandoel | Toepassing in GIP |
|---------------|------------------|
| **ADB01** | Werken volgens privacywetgeving (gebruikersdata, wachtwoorden) |
| **ADB05–06** | Analyse & planning van project |
| **ADB08–10** | Ontwikkeling, testing & debugging van applicatie |
| **ADB11** | Documentatie van code en structuur |
| **ADB15** | Gebruik van GitHub voor versiebeheer |
| **ADB17–ADB21** | Datamodel, implementatie, query’s & onderhoud databank |
| **ADB24–ADB25** | Webapplicatie bouwen & databank integreren |
| **ADB26–ADB28** | Handleiding, toelichting & communicatie over project |
| **VAT01** | Respectvolle samenwerking, deadlines naleven |

---

## 🧭 6. Fasering & planning

| Fase | Periode | Activiteiten | Product(en) | Evaluatie |
|------|----------|---------------|--------------|------------|
| **1. Analyse & ontwerp** | November | Probleemstelling, ERD, wireframes, planning opstellen | Analyseverslag + ERD | Proces & documentatie |
| **2. Ontwikkeling databank** | December | Ontwerpen & implementeren van MySQL-tabellen | MySQL-script | Technische werking |
| **3. Applicatieontwikkeling** | December – April | Ontwikkeling front-end en back-end in PHP | Werkende webapplicatie | Functionele test |
| **4. Testing & debugging** | April | Testen, fouten opsporen & verbeteren | Testverslag | Kwaliteit code & verbeteringen |
| **5. Documentatie & handleiding** | Mei | Gebruikershandleiding met screenshots | PDF-handleiding | Duidelijkheid & volledigheid |
| **6. Eindpresentatie** | Juni | Mondelinge verdediging, demo van project | Presentatie | Communicatie & inhoud |
| **7. Reflectie** | Juni | Persoonlijke reflectie op project & proces | Reflectieverslag | Zelfevaluatie & attitude |

---

## 🧑‍🏫 7. Rollen en verantwoordelijkheden

### Leerlingen
- Werken in duo aan het project  
- Houden GitHub-repository up-to-date  
- Documenteren hun werk (code, analyses, testverslag)  
- Respecteren deadlines en communiceren met begeleiders  

### Begeleidend leerkrachtenteam
| Rol | Verantwoordelijkheid |
|------|----------------------|
| **Projectcoach (ICT)** | Begeleidt technische uitvoering en codekwaliteit |
| **Extern Jurylid** | Volgt voortgang, attitude en deadlines op |
| **Taalleerkracht (optioneel)** | Ondersteunt bij rapportering en taalgebruik |

---

## 🧮 8. Evaluatiematrix

| Domein | Criteria | Punten | Leerplandoelen |
|---------|-----------|---------|----------------|
| **Analyse & planning** | Analyse van opdracht, ERD, planning | 10 | ADB05–06 |
| **Ontwikkeling** | Codekwaliteit, werking CRUD, PHP/MySQL-integratie | 35 | ADB08–ADB10, ADB17–ADB25 |
| **Testing & onderhoud** | Testplan, debugging, verbeteringen | 10 | ADB10, ADB14 |
| **Versiebeheer** | Gebruik van GitHub, commits, structuur | 10 | ADB15 |
| **Documentatie & handleiding** | Technische & gebruikersdocumentatie | 10 | ADB11, ADB26 |
| **Presentatie & communicatie** | Demo, mondelinge toelichting | 10 | ADB27–ADB28 |
| **Attitudes** | Respect, samenwerking, deadlines | 10 | VAT01 |
| **Reflectie** | Zelfevaluatie & leerproces | 5 | SV01.01 |
| **Totaal** |  | **100** |  |

---

## 🗓️ 9. Oplevermomenten

| Datum | Oplevering | Evaluatievorm |
|--------|-------------|----------------|
| **Eind november** | Analyseverslag + ERD | Formatieve feedback |
| **Eind december** | Werkende databank | Tussentijdse evaluatie |
| **Eind april** | Functionerende applicatie | Cijfer – deel 1 |
| **Eind mei** | Handleiding + documentatie | Cijfer – deel 2 |
| **Half juni** | Mondelinge presentatie | Cijfer – deel 3 |
| **Eind juni** | Reflectieverslag | Attitude + proces |

---

## 📘 10. Eindproducten
- Werkende webapplicatie (PHP + MySQL)  
- Analyseverslag & ERD-diagram  
- Testverslag  
- Gebruikershandleiding  
- GitHub-repository  
- Presentatie & demo  
- Reflectieverslag  

---
