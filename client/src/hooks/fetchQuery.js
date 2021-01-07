import {useState, useEffect } from 'react'

function useFetchQuery() {
    const [query, setQuery] = useState({});

    const getQuery = async () => {
        const endpoint = "http://127.0.0.1:3003/posts";

        try {
            const response = await fetch(endpoint); 
            const data = await response.json();
            setQuery(data);
        } catch (err){
            setQuery(err);
        }
    }

    useEffect(() => {
        getQuery();
    },[]);

    return {query, setQuery};
}

export default useFetchQuery;