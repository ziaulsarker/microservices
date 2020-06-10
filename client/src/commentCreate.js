import React, { useState, useRef } from "react";

function CommentCreate(props) {
    const [comment, setComment] = useState("");
    const ref = useRef(null);

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
            `http://127.0.0.1:4000/posts/${props.postId}/comments`,
            fetchOptions
        );

        const comments = await response.json();
        console.log("comments => ", comments);
    };

    return (
        <div>
            <form ref={ref} onSubmit={handleSubmit}>
                <label>comment</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    {" "}
                    Submit{" "}
                </button>
            </form>
        </div>
    );
}

export default CommentCreate;
