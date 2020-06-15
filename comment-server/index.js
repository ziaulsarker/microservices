import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

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

app.use(
    cors({
        origin: ["http://localhost:3000/", "http://localhost:3000"],
    })
);

app.get("/", async (req, res) => {
    res.json({ service: "comment" });
});

app.get("/posts/:id/comments", async (req, res) => {
    res.json(commentsByPostID[req.params.id] ?? []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString("hex");

    const { content } = req.body;
    const { id } = req.params;

    const comments = commentsByPostID[id] ?? [];

    comments.push({ id: commentId, content });

    commentsByPostID[id] = comments;

    try {
        const eventBusResponse = await axios.post(
            "http://127.0.0.1:4005/events",
            {
                type: "COMMENT_CREATED",
                data: { id: commentId, content, postID: id },
            }
        );

        console.log("EVENT FROM COMMENT => ", eventBusResponse);
    } catch (e) {
        console.log("EVENT BUS RESPONSE ERROR => ", e);
    }

    res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
    console.log("new event emitted", req.body.type);
    res.send({ event: req.body.type });
});

app.listen(port, host, async () => {
    console.log(`server is running on ${host}:${port}`);
});
