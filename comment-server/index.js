import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4001;
const host = "127.0.0.1";

const commentsByPostID = {};

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

app.get("/", async (req, res) => {
    res.json({ service: "comment" });
});

app.get("/posts/:id/comments", async (req, res) => {
    res.json({ service: "comment" });
});

app.post("/posts/:id/comments", async (req, res) => {
    res.json({ service: "comment" });
});

app.listen(port, host, async () => {
    console.log(`server is running on ${host}:${port}`);
});
