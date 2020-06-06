import { useState, useEffect } from "react";

export default function useFetch(url, options) {
    const [response, setResponse] = useState("");

    const fetchData = async (url, options) => {
        const res = await fetch(url, options);
        const data = await res.json();
        setResponse(data);
    };

    useEffect(() => {
        fetchData(url, options);
    }, [url]);

    return response;
}
