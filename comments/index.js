import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {randomBytes} from "crypto";

const server = express();
const PORT = 3002;
const HOST = "127.0.0.1";

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const commentsByPostId = {};

server.get("/", (req, res) => {
    res.send(commentsByPostId);
});

server.get("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    const commentsByPost = commentsByPostId[postId] ?? "this post does not exist";
    res.send(commentsByPost);
})

server.post("/posts/:id/comments", (req, res) => {
    const postID = req.params.id;
    const {content} = req.body;
    const commentsByPost = commentsByPostId[postID] ?? [];
    const commentID = randomBytes(4).toString("hex"); 
    const comment = {content, commentID};    
    commentsByPost.push(comment);
    commentsByPostId[postID] = commentsByPost; 
    res.json(commentsByPost);
})

server.listen(PORT, HOST, () => {
    console.log(`server is running on ${HOST}:${PORT}`)
})