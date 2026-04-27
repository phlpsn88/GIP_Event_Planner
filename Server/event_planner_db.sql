-- Aanmaken database
CREATE DATABASE event_planner;

--  Database gebruiken
USE event_planner;

-- Tabel Users aanmaken
CREATE TABLE users (
    ID INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(64) NOT NULL,
    role VARCHAR(20) DEFAULT 'Gebruiker',
    PRIMARY KEY (ID),
    UNIQUE (email)
);

-- Tabel Events aanmaken
CREATE TABLE events (
    ID INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(150),
    status BOOL NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (user_id) REFERENCES users(ID)
);

-- Dummy data voor users
INSERT INTO users (username, email, password) VALUES
('admin', 'admin@visionevents.be', 'PLACEHOLDER'),
('sarah', 'sarah@mail.com', 'PLACEHOLDER'),
('tom', 'tom@mail.com', 'PLACEHOLDER'),
('lena', 'lena@mail.com', 'PLACEHOLDER');

-- Dummy data voor events
INSERT INTO events (user_id, title, description, event_date, location, status) VALUES
(1, 'VisionEvents Launch', 'Officiële lancering van het VisionEvents platform', '2025-02-15', 'Hasselt', 1),
(1, 'Admin Overleg', 'Interne bespreking met alle admins', '2025-03-05', 'Online', 1),

(2, 'Verjaardagsfeest Sarah', 'Feest met vrienden en familie', '2025-01-20', 'Gent', 1),
(2, 'Workshop Fotografie', 'Introductieworkshop fotografie', '2025-02-10', 'Antwerpen', 1),
(2, 'Yoga Retreat', 'Ontspannende yogaweekend', '2025-04-18', 'Durbuy', 0),

(3, 'LAN Party', 'Gaming avond met vrienden', '2025-01-25', 'Leuven', 1),
(3, 'Project Meeting', 'Bespreking groepsproject', '2025-02-03', 'School', 1),

(4, 'Concert Night', 'Live concert met verschillende artiesten', '2025-03-22', 'Brussel', 1),
(4, 'Boekenbeurs', 'Bezoek aan de boekenbeurs', '2025-11-01', 'Antwerpen Expo', 1);
