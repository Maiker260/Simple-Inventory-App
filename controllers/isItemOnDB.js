import { dbQuery } from "../models/dbQuery.js"

export async function isItemOnDB(id, type) {
    const query = `
        SELECT 1 FROM media WHERE item_id = $1 AND type = $2 LIMIT 1;
    `;

    const results = await dbQuery(query, [id, type]);

    return results.length > 0;
}