#! /usr/bin/env node

import { dbQuery } from "./dbQuery.js";

const SQL = `
    CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL CHECK (type IN ('anime', 'manga')),
        title TEXT NOT NULL,
        item_id INT NOT NULL,
        description TEXT,
        image_url TEXT,
        status TEXT,
        genres TEXT,
        episodes INT,
        chapters INT
    );

    CREATE TABLE IF NOT EXISTS list (
        id SERIAL PRIMARY KEY,
        media_id INT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
        username TEXT
    );
`;

const DUMMY_DATA = `
    INSERT INTO media (type, title, item_id, description, image_url, status, genres, episodes, chapters)
    VALUES
    ('anime', 'Fullmetal Alchemist: Brotherhood', 5114, 'Two brothers search for a Philosopher''s Stone after an attempt to revive their deceased mother goes awry.', 'https://cdn.myanimelist.net/images/anime/1208/94745.webp', 'Finished Airing', 'Shounen', 64, NULL),
    ('manga', 'Attack on Titan', 23390, 'Humans fight for survival against giant humanoid creatures known as Titans.', 'https://cdn.myanimelist.net/images/manga/2/37846.webp', 'Finished', 'Shounen', NULL, 139),
    ('anime', 'Demon Slayer', 38000, 'A boy becomes a demon slayer after demons slaughter his family.', 'https://cdn.myanimelist.net/images/anime/1286/99889.webp', 'Finished Airing', 'Shounen', 26, NULL),
    ('manga', 'One Piece', 13, 'A boy with rubber powers sails to become Pirate King.', 'https://cdn.myanimelist.net/images/manga/2/253146.webp', 'Publishing', 'Shounen', NULL, 1000);

    INSERT INTO list (media_id, username)
    VALUES 
    (1, 'Juan'),
    (2, 'Pedro'),
    (3, 'Alex'),
    (4, 'Robert');
`;

async function setupDatabase() {
    try {
        console.log("Creating tables...");
        await dbQuery(SQL);
        console.log("Inserting dummy data...");
        await dbQuery(DUMMY_DATA);
        console.log("Database setup complete.");
    } catch (err) {
        console.error("Error setting up database:", err);
    }
}

setupDatabase();
