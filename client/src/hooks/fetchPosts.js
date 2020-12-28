import React, {useState, useEffect} from 'react';

function useFetchPosts() {
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        const postEndpoint = 'http://127.0.0.1:3001/posts'
        try{
            const postsRes = await fetch(postEndpoint);
            const fetchedPosts = await postsRes.json();
            setPosts(fetchedPosts);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return { posts, setPosts };
}

export default useFetchPosts