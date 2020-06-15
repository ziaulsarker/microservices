import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4005;
const host = `127.0.0.1`;

const jsonPharser = bodyParser.json();
const urlEncoder = bodyParser.urlencoded({ extended: true });
const corsMiddleware = cors({
    origin: ["http://localhost:3000/", "http://localhost:3000"],
});

app.use([jsonPharser, urlEncoder, corsMiddleware]);

app.get("/", async (req, res, next) => {
    res.json({ server: "Event Broker" });
});

app.post("/events", async (req, res) => {
    const event = req.body;

    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);

    res.send({ status: "OK" });
});

app.listen(port, host, async () => {
    console.log(`Event Broker is running on ${host}:${port}`);
});
