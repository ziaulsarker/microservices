import React, { useRef, useState, useContext, useEffect } from "react";
import { DataContext } from "./context/context";

export default function PostCreate(props) {
    const [title, setTitle] = useState("");
    const ref = useRef(null);
    const { setPosts } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:4000/posts", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });

        const data = await response.json();

        const posts = await fetch("http://127.0.0.1:4002/posts").then((res) =>
            res.json()
        );

        console.log("posts", posts);

        setPosts(posts);

        setTitle("");
    };

    return (
        <div>
            <form ref={ref} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="post"
                    />
                </div>
                <button className="btn btn-primary"> Submit </button>
            </form>
        </div>
    );
}
