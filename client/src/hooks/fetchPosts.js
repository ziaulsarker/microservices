import React, { useState, useEffect } from "react";

function useFetchedPosts(props) {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const res = await fetch("http://127.0.0.1:4000/posts");
        const fetchedPosts = await res.json();
        setPosts(fetchedPosts);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return posts;
}

export default useFetchedPosts;
