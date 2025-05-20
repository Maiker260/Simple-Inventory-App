import express from "express";
import { searchSeries, getSeriesDetails } from "../services/malAPI.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { search, type, items } = req.query;

    if (!search) {
        return res.render("searchForm", { results: null });
    }

    try {
        const searchResults = await searchSeries(search, type, items);
        if (searchResults?.data?.length > 0) {
            const promises = searchResults.data.map(item => {
                const itemId = item.node.id;
                return getSeriesDetails(type, itemId);
            });

            const results = await Promise.all(promises);
            res.render('searchForm', { results, type });

        } else {
            console.log("No Results Found");
        };



    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving results");
    }
});

export default router;