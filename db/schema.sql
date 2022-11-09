DROP DATABASE IF EXISTS guild_db;

CREATE DATABASE guild_db;

USE guild_db;

CREATE TABLE factions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    faction_name VARCHAR(30) NOT NULL
);

CREATE TABLE positions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    faction_id INT,
    FOREIGN KEY (faction_id)
    REFERENCES factions(id)
    ON DELETE SET NULL
);

CREATE TABLE members (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    captain_id INT,
    FOREIGN KEY (captain_id)
    REFERENCES members(id)
    ON DELETE SET NULL
);