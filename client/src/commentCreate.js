import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import CommentList from "./commentList";
import { DataContext } from "./context/context";

function CommentCreate({ post, ...props }) {
    const [comment, setComment] = useState("");
    const [postCommentList, setPostCommentList] = useState([]);
    const { setPosts, posts } = useContext(DataContext);

    const ref = useRef(null);

    console.log(post);

    useEffect(() => {
        setPostCommentList(post.comments);
    }, [post.comments]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fetchOptions = {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: comment }),
        };

        const response = await fetch(
            `http://127.0.0.1:4001/posts/${post.id}/comments`,
            fetchOptions
        );

        const comments = await fetch(
            "http://127.0.0.1:4002/posts"
        ).then((res) => res.json());

        setPosts(comments);

        setComment("");
    };

    return (
        <div className="my-2">
            <div>
                {useMemo(
                    () => (
                        <CommentList list={post.comments} />
                    ),
                    [post.comments]
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
