import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", async (req, res, next) => {
    res.send({ moderation: "fuck this comment" });
});

app.post("/events", async (req, res, next) => {
    const {
        type,
        data: { id, content, postID, status },
    } = req.body;

    if (type === "COMMENT_CREATED") {
        const status = data.content.includes("orange")
            ? "rejected"
            : "approved";

        const res = await axios.post("http://127.0.0.1:4005/events", {
            type: "COMMENT_MODERATED",
            data: { id, content, postID, status },
        });

        console.log("res => ", res);
    }
});

app.listen(4004, () => {
    console.log("working on port 4004");
});
