import React, {useEffect, useState} from 'react';

function useFetchComments(postId, setter) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const getComments = async id => {
            const response = await fetch(`http://127.0.0.1:3002/posts/${id}/comments`);
            const comments = await response.json();
            setComments(comments);
        };
        getComments(postId);
    }, [postId, setter]);

    return comments;
}

export default useFetchComments; 