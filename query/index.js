import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import {POST_CREATE, COMMENT_CREATE, COMMENT_UPDATED} from "./constants.js";

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

const handleEvent = (type, payload) => {
    const {postId, content, commentId, status} = payload;
    switch (type) {
        case POST_CREATE :
            const {id, title, comments = {}} = payload;
            if(!posts[id]){
                posts[id] = {postId: id, title, comments}; 
            }
        case  COMMENT_CREATE : 
            if(!posts[postId]){
                posts[postId] = {postId, comments:{[commentId]: {commentId, content, status}}};  
            }
            posts[postId].comments[commentId] = {commentId, content, status};
        case COMMENT_UPDATED : 
            posts[postId].comments[commentId].status = status;
        default : return posts  
    }
}

server.get("/posts", async (req, res) => {
    res.status(200).json(posts);
});

server.post("/events", (req, res) => {
    const event = req.body;
    const {type, payload} = event;

    handleEvent(type, payload);
    return res.status(200).send(posts); 
    
})

server.listen(PORT, HOST, async () => {
    try {
        const pastedEvents =  await axios.get("http://127.0.0.1:4000/events")
        for( const {type, payload} of pastedEvents.data ){
            handleEvent(type, payload);
        }
    }catch (err) {
        console.error(err);
    }

    console.log(`QUERY server is running on ${HOST}:${PORT}`);
})