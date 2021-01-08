import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {COMMENT_CREATE, COMMENT_UPDATED, COMMENT_MODERATED} from "./constants.js";

const server = express();
const PORT = process.env.PORT ?? 3004;
const HOST = "127.0.0.1";

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get("/", (req, res) => {
  res.status(200).json({"yaao": "pussy bitch"})
})

server.post("/events", async (req, res, next) => {
  const event = req.body;
  const { type, payload } = event;
  
  console.log("mod => ", type, payload)
  switch (type) {
    case COMMENT_CREATE :
      const status = payload.content.includes("orange") ? "rejected" : "accepted";
      const data = {
        type: COMMENT_MODERATED,
        payload: {...payload, status}
      }
      try{
        const moderatedResponse = await axios.post("http://127.0.0.1:4000/events", data);
        console.log(moderatedResponse.data);
      } catch (err){
        console.error("MODERATOR ERROR =>", err);
        next(err);
      }
      break;
    case COMMENT_MODERATED : 
      break;
    case COMMENT_UPDATED : 
      break;  
    default :
      return res.status(201).send(event);
  }

  res.status(201).send(event);

})

server.listen(PORT, HOST, () => {
  console.log(`MODERATOR server listening on port ${HOST}:${PORT}`)
})

