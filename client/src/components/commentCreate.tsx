
import React, { useState, SyntheticEvent, useMemo, useContext } from "react";
import {PostsContext} from "../contexts/posts-context";
import {UseFetchPostsInterfaces} from "../types/post-type";
import { Comment } from "../types/post-type";
interface Props {
    data: {
        postId: string;
        title: string;
        comments: Comment[];
    }
}

function CommentCreate ({data}: Props): React.ReactElement {
    const [commentContent, setCommentContent] = useState("");
    const {setQuery} : UseFetchPostsInterfaces | any = useContext(PostsContext)

    const {postId, comments} = data;

    const memoizedJSX = useMemo(() => {
    const handleCommentCreate = async (event: SyntheticEvent) => {
        event.preventDefault();
        const commentEndpoint = 'http://127.0.0.1:3002/posts'
        const queryEndpoint = "http://127.0.0.1:3003/posts";
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: commentContent})
        }

        try{
            await fetch(`${commentEndpoint}/${postId}/comments`, options);
            const queryResult = await (await fetch(queryEndpoint)).json();
            setQuery(queryResult);
        } catch (err) {
            console.error(err);
        }

        setCommentContent("");

    }
       return (
           <div>
                {Object.values(comments).map(({commentId, content, status}) => <li key={commentId}>{ status === "accepted" ?  content : "...pending"}</li>)}
                <form onSubmit={handleCommentCreate}>
                    <label  className="block">{postId}</label>
                    <input type="text" onChange={e => setCommentContent(e.target.value)} value={commentContent} className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 px-2 py-1"/>
                    <input type="submit" value="Add Comment" className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 px-2 py-1"/>
                </form>
            </div>
       );
    }, [postId, comments, commentContent, setQuery]);

    return memoizedJSX;
}


export default CommentCreate