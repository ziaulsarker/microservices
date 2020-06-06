import React, { useRef, useState } from "react";

export default function PostCreate(props) {
    const [title, setTitle] = useState("");
    const ref = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(JSON.stringify({ title }));
        const response = await fetch("http://127.0.0.1:4000/posts", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });

        const data = await response.json();

        console.log("data => ", data);
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
                    />
                </div>
                <button className="btn btn-primary"> Submit </button>
            </form>
        </div>
    );
}
