import express from "express";
import { searchSeries } from "../services/malAPI.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { search, type, items } = req.query;

    if (!search) {
        res.render("searchForm")
    }

    // try {
    //     const results = await searchSeries(type, search, items);

    //     res.render("searchForm", { results });

    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Error retrieving results");
    // }
});

export default router;