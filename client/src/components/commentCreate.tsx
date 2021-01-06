
import React, { useState, SyntheticEvent, useMemo, useEffect } from "react";

interface Props {
    postId: string;
}

function CommentCreate ({postId}: Props): React.ReactElement {
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getComments = async (id:string) => {
            try {
                const response = await fetch(`http://127.0.0.1:3002/posts/${id}/comments`);
                const comments = await response.json();
                setComments(comments);
            } catch (err) {
                return comments;
            }
        };
        getComments(postId);
    }, []);

    const memoizedJSX = useMemo(() => {
    const handleCommentCreate = async (event: SyntheticEvent) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: commentContent})
        }

        fetch(`http://127.0.0.1:3002/posts/${postId}/comments`, options)
            .then((response => response.json()))
            .then(data => setComments(data));

        // try{
        //     const response = await fetch(`http://127.0.0.1:3002/posts/${postId}/comments`, options)
        //     const comments = await response.json();
        //     setComments(comments);
        // } catch (err) {
        //     console.error(err);
        // }

        setCommentContent("");

    }
       return (
           <div>
                {comments.map(({commentId, content}) => <li key={commentId}>{content}</li>)}
                <form onSubmit={handleCommentCreate}>
                    <label  className="block">{postId}</label>
                    <input type="text" onChange={e => setCommentContent(e.target.value)} value={commentContent} className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 px-2 py-1"/>
                    <input type="submit" value="Add Comment" className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 px-2 py-1"/>
                </form>
            </div>
       );
    }, [postId, comments, commentContent]);

    return memoizedJSX;
}


export default CommentCreate