import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import indexRouter from "./routes/main.js";
import searchRouter from "./routes/searchpage.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/search", searchRouter);

app.listen(3000, () => {
    console.log("Server Running!!");
});