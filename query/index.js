import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const host = "127.0.0.1";
const port = process.env.PORT || 4002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ["http://localhost:3000/", "http://localhost:3000"],
    })
);

const posts = {};

app.get("/", async (req, res) => {
    res.send(posts);
});

app.get("/posts", async (req, res) => {
    res.send(posts);
});

app.post("/events", async (req, res) => {
    const { type } = req.body;
    if (type === "POST_CREATED") {
        const {
            type,
            data: { id, title },
        } = req.body;
        posts[id] = {
            id,
            title,
            comments: [],
        };
    }

    if (type === "COMMENT_CREATED") {
        const {
            data: { id, content, postID, status },
        } = req.body;

        console.log(req.body);
        console.log(posts);
        console.log(posts[postID]);

        posts[postID].comments.push({ id, content, status });
    }

    res.send(posts);
});

app.listen(port, host, () => {
    console.log(`server is running on ${host}:${port}`);
});
