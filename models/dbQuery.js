import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export async function dbQuery(query, params = []) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();

        const results = await client.query(query, params);
        return results.rows;

    } catch (err) {
        console.error("Query Error:", err.message);
        throw err;

    } finally {
        await client.end();
    }
}