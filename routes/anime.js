import express from "express";
import { dbQuery } from "../models/dbQuery.js";

const router = express.Router();

const query = `
    SELECT
        list.username,
        media.title,
        media.type,
        media.item_id,
        media.description,
        media.image_url,
        media.episodes,
        media.chapters
    FROM list
    JOIN media ON list.media_id = media.id
    WHERE media.type = 'anime';
`

const test = `
    SELECT * FROM list;
`

router.get("/", async (req, res) => {
    try {
        const data = await dbQuery(test);
        console.log(data);
        res.render("animePage");
    } catch (err) {
        console.error("Error fetching Data:", err);
    }
});

export default router