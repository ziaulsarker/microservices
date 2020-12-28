import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {randomBytes} from "crypto";

const server = express();
const port = 3001;
const host = "127.0.0.1";

server.use(bodyParser.json()) // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-

server.use(cors({
    origin: ["http://localhost:3000/", "http://localhost:3000"],   
}))

const posts = {};


server.get("/", (req, res) => {
    res.send(`path: ${req.path} baseurl: ${req.originalUrl} This is the post url `);
})

server.get("/posts", (req, res) => {
    res.json(posts);
})

server.post("/posts", (req, res) => {
    const id = randomBytes(4).toString("hex");
    const {title} = req.body;

    // set posts data
    posts[id] = {id, title};

    res.send(posts);
})

server.listen(port, host, '127.0.0.1', () => {
    console.log(`server is running on ${host}:${port}`);
})