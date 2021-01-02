
import React, { useState, useContext, SyntheticEvent, useMemo } from "react";
import {PostsContext} from "../contexts/posts-context";
interface Props {
    postId?: string;
}

function CommentCreate ({postId}: Props): React.ReactElement {

    const [comment, setComment] = useState("");
    const context = useContext(PostsContext)

    console.log("context => ", context);

    const handleCommentCreate= (event: SyntheticEvent) => {
        event.preventDefault();
        setComment("");
    }

    const memoizedJSX = useMemo(() => {
       return (
           <div>
                <form onSubmit={handleCommentCreate}>
                    <label  className="block">{postId}</label>
                    <input type="text" onChange={e => setComment(e.target.value)} value={comment} className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 px-2 py-1"/>
                    <input type="submit" value="Add Comment" className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 px-2 py-1"/>
                </form>
            </div>
       );
    }, [comment, postId]);

    return memoizedJSX;
}


export default CommentCreate