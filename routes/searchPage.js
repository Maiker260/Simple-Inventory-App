import express from "express";
import { searchSeries } from "../services/malAPI.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { search, type, items } = req.query;

    if (!search) {
        return res.render("searchForm", { results: null });
    }

    try {
        const results = await searchSeries(search, type, items);
        res.render("searchForm", { results });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving results");
    }
});

export default router;