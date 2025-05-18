import express from "express";
import { dbQuery } from "../models/dbQuery.js";

const router = express.Router();

const query = `
    SELECT 
        SUM(CASE WHEN type = 'anime' THEN 1 ELSE 0 END) AS animeCount,
        SUM(CASE WHEN type = 'manga' THEN 1 ELSE 0 END) AS mangaCount
    FROM media;
`;

router.get("/", async (req, res) => {
    try {
        const result = await dbQuery(query);
        const { animecount, mangacount } = result[0];
        res.render("index", { animeData: animecount, mangaData: mangacount });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;