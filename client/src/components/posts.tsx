import React, {useContext} from 'react';
import {Post, UseFetchPostsInterfaces} from "../types/post-type";
import {PostsContext} from "../contexts/posts-context.js"
import CommentCreate from "./commentCreate";

interface Props {
  children?: React.ReactChildren
}

const PostList = (props: Props): React.ReactElement => {
  const {posts}: UseFetchPostsInterfaces = useContext(PostsContext);
  const availablePosts: Post[] | any= Object.values({...posts});
  return (
    <>
    {availablePosts.map( ({id, title}: Post) => (
      <div key={id}>
        <h2> {title} </h2> 
        <CommentCreate postId={id}/> 
      </div>
    ))}
    </>
  )
}

export default PostList
