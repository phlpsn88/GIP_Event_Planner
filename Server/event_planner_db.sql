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
    FOREIGN KEY (user_id) REFERENCES users(ID) ON DELETE SET NULL;
);