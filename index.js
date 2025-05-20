import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import indexRouter from "./routes/main.js";
import searchRouter from "./routes/searchPage.js";
import animeRouter from "./routes/anime.js";
import mangaRouter from "./routes/manga.js";
import addSeriesRouter from "./routes/addSeries.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/search", searchRouter);
app.use("/anime", animeRouter);
app.use("/manga", mangaRouter);
app.use("/add-to-database", addSeriesRouter);

app.listen(3000, () => {
    console.log("Server Running!!");
});