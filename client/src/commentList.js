import React, { useEffect, useState } from "react";

function CommentList({ list, id, ...props }) {
    const [commets, setComments] = useState([]);

    const getComments = async (id) => {
        const res = await fetch(`http://127.0.0.1:4001/posts/${id}/comments`);

        const data = await res.json();

        setComments(data);
    };

    useEffect(() => {
        getComments(id);
    }, [list]);

    return (
        <ul>{list && commets.map((c) => <li key={c.id}>{c.content}</li>)}</ul>
    );
}

export default CommentList;
