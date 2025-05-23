import express from "express";
import { dbQuery } from "../models/dbQuery.js";

const router = express.Router();

const query = `
    SELECT 
        list.username,
        media.title,
        media.item_id,
        media.description,
        media.image_url,
        media.status,
        media.genres,
        media.chapters
    FROM list
    JOIN media ON list.media_id = media.id
    WHERE media.type = 'manga';
`;

router.get("/", async (req, res) => {
    try {
        const data = await dbQuery(query);
        res.render("mangaPage", { data });
    } catch (err) {
        console.error("Error fetching Data:", err);
    }
});

export default router;
