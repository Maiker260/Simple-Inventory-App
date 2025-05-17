#! /usr/bin/env node

import { Client } from "pg";
import dotenv from "dotenv"

dotenv.config();

const SQL = `
    CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL CHECK (type IN ('anime', 'manga')),
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        episodes INT,
        chapters INT
    );

    CREATE TABLE IF NOT EXISTS list (
        id SERIAL PRIMARY KEY,
        media_id INT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
        user TEXT
    );
`;

const DUMMY_DATA = `
    INSERT INTO media (id, type, title, description, image_url, episodes, chapters)
    VALUES 
    ('anime', 'Fullmetal Alchemist: Brotherhood', 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes awry.', 'https://example.com/fma.jpg', 64, NULL),
    ('manga', 'Attack on Titan', 'Humans fight for survival against giant humanoid creatures known as Titans.', 'https://example.com/aot.jpg', NULL, 139),
    ('anime', 'Demon Slayer', 'A boy becomes a demon slayer after demons slaughter his family.', 'https://example.com/ds.jpg', 26, NULL),
    ('manga', 'One Piece', 'A boy with rubber powers sails to become Pirate King.', 'https://example.com/op.jpg', NULL, 1000);

    INSERT INTO list (media_id, user)
    VALUES 
    (1, 'Juan'),
    (2, 'Pedro'),
    (3, 'Alex');
    (3, 'Robert');
`

async function main() {
    console.log("Connecting");
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.query(DUMMY_DATA);
    await client.end();
    console.log("Done");
};

main();