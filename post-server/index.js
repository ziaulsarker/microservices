import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";

const host = "127.0.0.1";
const port = process.env.PORT || 4000;

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

app.use(
    cors({
        origin: ["http://localhost:3000/", "http://localhost:3000"],
    })
);

const posts = {};

app.get("/", (req, res, next) => {
    res.json({ app: `post microservice` });
});

app.get("/posts", (req, res, next) => {
    res.json(posts);
});

app.post("/posts", (req, res, next) => {
    const id = randomBytes(4).toString("hex");
    console.log(req.body, "=> => ");
    const { title } = JSON.parse(JSON.stringify(req.body));
    console.log(req.body.title);
    posts[id] = { id, title };

    res.status(201).json(posts);
});

app.listen(port, host, async () => {
    console.log(`server is running on ${host}:${port}`);
});
