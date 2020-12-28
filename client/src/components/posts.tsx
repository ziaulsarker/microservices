import React, {useContext} from 'react';
import {Post, UseFetchPostsInterfaces} from "../types/post-type";
import {PostsContext} from "../contexts/posts-context.js"

interface Props {
  children?: React.ReactChildren
}

const PostList = (props: Props): React.ReactElement => {
  const {posts}: UseFetchPostsInterfaces = useContext(PostsContext);
  const availablePosts: Post[] | any= Object.values({...posts});
  return (
    <>
    {availablePosts.map( ({id, title}: Post) => <h2 key={id}> {title} </h2> ) }
    </>
  )
}

export default PostList
