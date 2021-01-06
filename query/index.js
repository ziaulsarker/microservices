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
        "http://localhost:3000"
    ],   
}))

const posts = {}

server.get("/posts", async (req, res) => {
    res.status(200).json(posts);
});

server.post("/events", (req, res) => {
    const event = req.body;
    const {type, payload} = event;

    console.log("event", event);
    
    switch (type) {
        case POST_CREATE :
            const {id, title, comments = []} = payload;
            if(!posts[id]){
                posts[id] = {postId: id, title, comments}; 
            }

            return res.status(201).json(posts); 
        
        case  COMMENT_CREATE : 
            const {postId, content, commentId} = payload;

            if(!posts[postId]){
                posts[postId] = {postId, comments:[{commentId, content}]};  
                return res.status(201).json(posts);
            }
     
            posts[postId].comments.push({commentId, content});
            return res.status(201).json(posts);
         
        default : 
            return res.status(200).send(posts);    
    }
})

server.listen(PORT, HOST, () => {
    console.log(`QUERY server is running on ${HOST}:${PORT}`);
})