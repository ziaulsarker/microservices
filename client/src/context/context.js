import React, { useState, createContext, useEffect, useMemo } from "react";
import useFetchedPosts from "../hooks/fetchPosts";

export const DataContext = createContext({});

function Provider(props) {
    const [posts, setPosts] = useState({});

    const fetchPosts = useFetchedPosts();

    useEffect(() => {
        setPosts(fetchPosts);
    }, [fetchPosts]);

    const data = { posts, setPosts };

    return (
        <DataContext.Provider value={data}>
            {props.children}
        </DataContext.Provider>
    );
}

export default Provider;
