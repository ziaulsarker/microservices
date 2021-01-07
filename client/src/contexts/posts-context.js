import React, {createContext} from 'react';
import useFetchPosts from "../hooks/fetchPosts.js";
import useFetchQuery from "../hooks/fetchQuery.js";

export const PostsContext = createContext({});

function PostProvider(props) {
    const {posts, setPosts} = useFetchPosts();
    const {query, setQuery} = useFetchQuery();

    const data = {
        posts, 
        setPosts, 
        query, 
        setQuery
    };

    return (
        <PostsContext.Provider value={data}>
            {props.children}
        </PostsContext.Provider>
    )
}

export default PostProvider;