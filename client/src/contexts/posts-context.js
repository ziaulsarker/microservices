import React, {createContext} from 'react';
import useFetchPosts from "../hooks/fetchPosts.js";


export const PostsContext = createContext({});

function PostProvider(props) {
    const {posts, setPosts} = useFetchPosts();
    const data = {posts: posts, setPosts: setPosts};
    return (
        <PostsContext.Provider value={data}>
            {props.children}
        </PostsContext.Provider>
    )
}

export default PostProvider;