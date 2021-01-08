import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {COMMENT_CREATED, COMMENT_UPDATED, COMMENT_MODERATED} from "./constants.js";

const server = express();
const PORT = process.env.PORT ?? 3004;
const HOST = "127.0.0.1";

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:4000"]
}))

server.get("/", (req, res) => {
  res.status(200).json({"yaao": "pussy bitch"})
})

server.post("/events", async (req, res) => {
  const event = req.body;
  const { type, payload } = event;

  switch (type) {
    case COMMENT_CREATED :
      break;
    case COMMENT_MODERATED : 
      break;
    case COMMENT_UPDATED : 
      break;  
    default :
      return
  }

  res.status(201).send(event);

})

server.listen(PORT, HOST, () => {
  console.log(`MODERATOR server listening on port ${HOST}:${PORT}`)
})

