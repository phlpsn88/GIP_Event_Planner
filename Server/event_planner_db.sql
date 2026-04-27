-- Aanmaken database
CREATE DATABASE event_planner;

--  Database gebruiken
USE event_planner;

-- Tabel Users aanmaken
CREATE TABLE USERS (
    ID INTEGER NOT NULL AUTO_INCREMENT,
    USERNAME VARCHAR(50) NOT NULL,
    EMAIL VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(64) NOT NULL,
    PRIMARY KEY (ID),
    UNIQUE (EMAIL)
);

-- Tabel Events aanmaken
CREATE TABLE EVENTS (
    ID INTEGER NOT NULL AUTO_INCREMENT,
    USER_ID INTEGER,
    TITLE VARCHAR(150) NOT NULL,
    DESCRIPTION TEXT,
    EVENT_DATE DATE NOT NULL,
    LOCATION VARCHAR(150),
    STATUS BOOL NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
);

-- Dummy data voor USERS
INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES
('admin', 'admin@visionevents.be', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'),
('sarah', 'sarah@mail.com', 'b7c2e5a9d1f4c8e6a3b9f2d5c7e1a4b8f6d9e3c2a5'),
('tom', 'tom@mail.com', 'c9e4a7b2d6f8e1a5c3b9d7e2f4a6c8b5e1d9'),
('lena', 'lena@mail.com', 'testWachtwoord');

-- Dummy data voor EVENTS
INSERT INTO EVENTS (USER_ID, TITLE, DESCRIPTION, EVENT_DATE, LOCATION, STATUS) VALUES
(1, 'VisionEvents Launch', 'Officiële lancering van het VisionEvents platform', '2025-02-15', 'Hasselt', 1),
(1, 'Admin Overleg', 'Interne bespreking met alle admins', '2025-03-05', 'Online', 1),

(2, 'Verjaardagsfeest Sarah', 'Feest met vrienden en familie', '2025-01-20', 'Gent', 1),
(2, 'Workshop Fotografie', 'Introductieworkshop fotografie', '2025-02-10', 'Antwerpen', 1),
(2, 'Yoga Retreat', 'Ontspannende yogaweekend', '2025-04-18', 'Durbuy', 0),

(3, 'LAN Party', 'Gaming avond met vrienden', '2025-01-25', 'Leuven', 1),
(3, 'Project Meeting', 'Bespreking groepsproject', '2025-02-03', 'School', 1),

(4, 'Concert Night', 'Live concert met verschillende artiesten', '2025-03-22', 'Brussel', 1),
(4, 'Boekenbeurs', 'Bezoek aan de boekenbeurs', '2025-11-01', 'Antwerpen Expo', 1);
