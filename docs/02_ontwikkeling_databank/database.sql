-- Aanmaken database
CREATE DATABASE event_planner;

--  Database gebruiken
USE event_planner

-- Tabel Users aanmaken
CREATE TABLE USERS (
    ID INTEGER AUTO_INCREMENT,
    USERNAME VARCHAR(50),
    EMAIL VARCHAR(255),
    PASSWORD VARCHAR(64)
    PRIMARY KEY (ID)
);
