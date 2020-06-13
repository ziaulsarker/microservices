import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4002;
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

app.listen(port, host, async () => {
    console.log(`Event Broker is running on ${host}:${port}`);
});
