import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export async function dbQuery(query, newSetup) {
    console.log("Connecting to DB:", process.env.DATABASE_URL); // ✅ Clean and works

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: !newSetup ? { rejectUnauthorized: false } : undefined,
    });

    try {
        await client.connect();
        const results = await client.query(query);
        return results.rows;
    } catch (err) {
        console.error("Query Error:", err.message);
        throw err;
    } finally {
        await client.end();
    }
}