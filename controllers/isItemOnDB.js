import { dbQuery } from "../models/dbQuery.js";

export async function isItemOnDB(id, type) {
    const results = await dbQuery(
        "SELECT 1 FROM media WHERE item_id = $1 AND type = $2 LIMIT 1",
        [id, type]
    );

    return results.length > 0;
}
