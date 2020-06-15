import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

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

app.post("/posts", async (req, res, next) => {
    const id = randomBytes(4).toString("hex");
    console.log(req.body, "=> => ");
    const { title } = JSON.parse(JSON.stringify(req.body));
    console.log(req.body.title);
    posts[id] = { id, title };

    try {
        const eventBusResponse = await axios.post(
            "http://127.0.0.1:4005/events",
            {
                type: `POST_CREATED`,
                data: {
                    id,
                    title,
                },
            }
        );
        console.log("EVENT FROM POST => ", eventBusResponse);
    } catch (err) {
        console.log("EVENT BUS RESPONSE ERROR => ", err);
    }

    res.status(201).json(posts);
});

app.post("/events", async (req, res) => {
    console.log("new event emitted", req.body.type);
    res.send({ event: req.body.type });
});

app.listen(port, host, async () => {
    console.log(`server is running on ${host}:${port}`);
});
