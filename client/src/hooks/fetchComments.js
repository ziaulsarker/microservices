import React, { useState, useEffect } from "react";

function useFetchedComments(postID) {
    const [comments, setComments] = useState({});

    const getComments = async (id) => {
        const res = await fetch(`http://127.0.0.1:40001/posts/${id}/commets`);
        const data = await res.json();

        setComments(data);
    };

    useEffect(() => {
        getComments(postID);
    }, []);

    return comments;
}

export default useFetchedComments;
