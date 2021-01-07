import React, {useContext} from 'react';
import {Post, UseFetchPostsInterfaces} from "../types/post-type";
import {PostsContext} from "../contexts/posts-context.js"
import CommentCreate from "./commentCreate";

interface Props {
  children?: React.ReactChildren
}

const PostList = (props: Props): React.ReactElement => {
  const { query } : UseFetchPostsInterfaces = useContext(PostsContext);
  const availablePosts: Post[] | any = Object.values({...query});
  return (
    <>
    {availablePosts.map( ({postId, title, comments = []}: any ) => (
      <div key={postId}>
        <h2> {title} </h2> 
        <CommentCreate data={{postId, title, comments}}/> 
      </div>
    ))}
    </>
  )
}

export default PostList
