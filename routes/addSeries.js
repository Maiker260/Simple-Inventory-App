import express from "express";
import { dbQuery } from "../models/dbQuery.js";
import fetchDataDetails from "../controllers/fetchDataDetails.js";
import { isItemOnDB } from "../controllers/isItemOnDB.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { seriesId, seriesType } = req.body;
    const itemExists = await isItemOnDB(seriesId, seriesType);

    const { id, title, synopsis, main_picture, num_episodes, num_chapters } = await fetchDataDetails(seriesType, seriesId);

    try {
        if (itemExists) {
            res.json({ success: true });
            return
        }

        const mediaInsertResult = await dbQuery(
            `INSERT INTO media (type, title, item_id, description, image_url, episodes, chapters) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING id`,
            [seriesType, title, id, synopsis, main_picture.medium, num_episodes, num_chapters]
        );

        const mediaId = mediaInsertResult[0].id;

        await dbQuery(
            `INSERT INTO list (media_id, username) VALUES ($1, $2)`,
            [mediaId, 'YoMerito']
        );

        res.json({ success: true });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to add to database' });
    }
});

export default router;