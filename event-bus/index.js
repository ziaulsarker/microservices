import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import {POST_CREATE, COMMENT_CREATE} from "./constants.js";

const server = express();
const HOST = "127.0.0.1";
const PORT = process.env.PORT ?? 4000;

const EVENT_ORIGINS = [
    "http://127.0.0.1:3001", 
    "https://127.0.0.1:3001",
    "http://127.0.0.1:3002", 
    "https://127.0.0.1:3002",
    "http://127.0.0.1:3003", 
    "https://127.0.0.1:3003",
    "http://127.0.0.1:3004", 
    "https://127.0.0.1:3004"
]

const events = []

server.use(cors({
    origin: EVENT_ORIGINS
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
    res.json({"yo": "pussy bitch"})
})

server.get("/events", async (req, res, next) => {
    res.json(events);
})

server.post("/events", async (req, res, next) => {
    const event = req.body;

    events.push(event);
    
    try {

        console.log("post => ", "event => ", event)
        const response = await axios.all([
            axios.post("http://127.0.0.1:3001/events", event),
            axios.post("http://127.0.0.1:3002/events", event),
            axios.post("http://127.0.0.1:3003/events", event),
            axios.post("http://127.0.0.1:3004/events", event),
        ])

        console.log("response => ", response)
    } catch(err) {
        console.error("EVENTS BUS  ERR", err);
        next(err);
    }

    res.status(200).send(event);
})

server.listen(PORT, HOST, () => {
    console.log(`EVENT BROKER server is running on ${HOST}:${PORT}`);
})
