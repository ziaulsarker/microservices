import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import {POST_CREATE, COMMENT_CREATE} from "./constants.js";

const server = express();
const PORT = process.env.PORT ?? 3003;
const HOST = `127.0.0.1`;

server.use(bodyParser.json()) // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-

server.use(cors({
    origin: [
        "http://127.0.0.1:4000", 
        "http://127.0.0.1:3000"
    ],   
}))

const posts = {}

server.get("/posts", async (req, res) => {
    res.status(200).json(posts);
});

server.post("/events", async (req, res) => {
    const event = req.body;
    const {type, payload} = event;

    console.log("event", event);
    
    switch (type) {
        case POST_CREATE : {
            const {id, title} = payload;
            if(!posts[payload.id]){
                posts[payload.id] = payload;
                res.status(201).json(posts);   
            }
            return res.status(200).json(posts); 
        }
        case  COMMENT_CREATE : {
            const {postId, content, commentId} = payload;
            if(posts[postId]?.comments){
                posts[postId].comments.push({commentId, content});
            }

            posts[postId].comments = [{commentId, content}];
            res.status(201).json(posts);
        }   


        default : 
            return res.status(200).send(posts);    
    }
})

server.listen(PORT, HOST, () => {
    console.log(`server is running on ${HOST}:${PORT}`);
})