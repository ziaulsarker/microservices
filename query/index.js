import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const host = "127.0.0.1";
const port = process.env.PORT || 4002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/posts", async (req, res) => {
    res.send({ posts: [] });
});

app.post("/posts", async (req, res) => {
    res.send({ posts: [] });
});

app.post("/events", async (req, res) => {});

app.listen(port, host, () => {
    console.log(`server is running on ${host}:${port}`);
});
