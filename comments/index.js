import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {randomBytes} from "crypto";
import {COMMENT_CREATE} from "./constants.js";
import axios from "axios";

const server = express();
const PORT = 3002;
const HOST = "127.0.0.1";

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors({
    origin: ["http://localhost:3000/", "http://localhost:3000", "http://127.0.0.1:4000"], 
}));

const commentsByPostId = {};

server.get("/", (req, res) => {
    res.send(commentsByPostId);
});

server.get("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    const commentsByPost = commentsByPostId[postId] ?? "this post does not exist";
    res.send(commentsByPost);
})

server.post("/posts/:id/comments", async (req, res, next) => {
    const postId = req.params.id;
    const {content} = req.body;
    const commentsByPost = commentsByPostId[postId] ?? [];
    const commentId = randomBytes(4).toString("hex"); 
    const comment = {content, commentId};    
    commentsByPost.push(comment);
    commentsByPostId[postId] = commentsByPost; 

    console.log("comment data => ", req.body);
    console.log("{postId, content, commentId} => ", {postId, content, commentId});

    try{
        const eventData = {
            type: COMMENT_CREATE,
            payload: {postId, content, commentId}
        }
        const response = await axios.post("http://127.0.0.1:4000/events", eventData);
    }catch(err){
        console.error("ERROR => ", err.message);
        next(err);
    }


    res.status(201).json(commentsByPost);
})

server.post("/events", async (req, res, next) => {
    const event = await req.body;
    const {type} = event;

    if(type === COMMENT_CREATE) {
        return res.status(201).json(event);
    }

    res.status(201).json({});
})

server.listen(PORT, HOST, () => {
    console.log(`COMMENTS server is running on ${HOST}:${PORT}`)
})