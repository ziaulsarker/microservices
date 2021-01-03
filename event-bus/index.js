import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import {POST_CREATE} from "./constants.js";

const server = express();
const HOST = "127.0.0.1";
const PORT = process.env.PORT ?? 4000;

const EVENT_ORIGINS = [
    "http://127.0.0.1:3001", 
    "https://127.0.0.1:3001",
    "http://127.0.0.1:3002", 
    "https://127.0.0.1:3002"
]

server.use(cors({
    origin: EVENT_ORIGINS
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
    res.json({"yo": "pussy bitch"})
})

server.post("/events", async (req, res, next) => {
    const event = req.body;
    axios.post("http://127.0.0.1:3003", event)

    res.status(200).send("OK");
})

server.listen(PORT, HOST, () => {
    console.log(`server is running on ${HOST}:${PORT}`);
})
