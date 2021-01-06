import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {randomBytes} from "crypto";
import axios from "axios";
import {POST_CREATE} from "./constants.js";

const server = express();
const PORT = 3001;
const HOST = "127.0.0.1";

server.use(bodyParser.json()) // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-

server.use(cors({
    origin: ["http://localhost:3000","http://127.0.0.1:4000"]  
}))

const posts = {};


server.get("/", (req, res) => {
    res.send(`path: ${req.path} baseurl: ${req.originalUrl} This is the post url `);
})

server.get("/posts", (req, res) => {
    res.json(posts);
})


server.post("/posts", async (req, res, next) => {
    const id = randomBytes(4).toString("hex");
    const {title} = req.body;
    const data = {id, title}
    // set posts data
    posts[id] = data;
    console.log("post data => ", req.body);

    try{
        const eventResponse = await axios.post("http://127.0.0.1:4000/events", {
            type: POST_CREATE,
            payload: data
        });

        console.log(eventResponse.data);
    } catch (err) {
        console.error("ERROR => ", err.message);
        next(err);
    }

    console.log('aaaa', req.body);
    res.status(201).json(posts);
})

server.post("/events", async (req, res, next) => {
    const event = await req.body;
    const {type} = event;

    if(type === POST_CREATE) {
        res.status(201).json(event);
    }
})

server.listen(PORT, HOST, () => {
    console.log(`POST server is running on ${HOST}:${PORT}`);
})