import React, { useState, useRef } from "react";
import CommentList from "./commentList";

function CommentCreate({ postID, ...props }) {
    const [comment, setComment] = useState("");
    const [postCommentList, setPostCommentList] = useState([]);

    const ref = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({ content: comment });

        const fetchOptions = {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: comment }),
        };

        const response = await fetch(
            `http://127.0.0.1:4001/posts/${postID}/comments`,
            fetchOptions
        );

        const comments = await response.json();

        setPostCommentList(comments);
        setComment("");

        console.log("comments => ", comments);
    };

    return (
        <div className="my-3">
            <form ref={ref} onSubmit={handleSubmit}>
                <label>comment</label>
                <input
                    type="text"
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" className="btn btn-warning">
                    {" "}
                    Submit{" "}
                </button>
            </form>

            <div>
                <CommentList id={postID} list={postCommentList} />
            </div>
        </div>
    );
}

export default CommentCreate;
