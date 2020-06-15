import React, { useState, useRef, useMemo } from "react";
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
        <div className="my-2">
            <div>
                {useMemo(
                    () => (
                        <CommentList id={postID} list={postCommentList} />
                    ),
                    [postCommentList, postID]
                )}
            </div>
            <form ref={ref} onSubmit={handleSubmit}>
                <label>comment</label>
                <input
                    type="text"
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" className="btn btn-warning mt-3">
                    {" "}
                    Submit{" "}
                </button>
            </form>
        </div>
    );
}

export default CommentCreate;
