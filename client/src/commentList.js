import React, { useEffect, useState } from "react";

function CommentList({ id, ...props }) {
    const [commets, setComments] = useState([]);

    const getComments = async (id) => {
        const res = await fetch(`http://127.0.0.1:40001/posts/${id}/commets`);
        const data = await res.json();

        setComments(data);
    };

    useEffect(() => {
        getComments(id);
    }, []);

    return (
        <ul>
            {commets.map((c) => (
                <li key={c.id}>{c.content}</li>
            ))}
        </ul>
    );
}

export default CommentList;
