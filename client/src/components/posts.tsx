import React, {useContext} from 'react';
import {Post} from "../types/post-type";
import {PostsContext} from "../contexts/posts-context.js"

function PostList(): React.ReactElement{
  const {posts} = useContext<Post[] | any>(PostsContext);
  return (
    <div>
      { Object.values(posts).map<Post[]>(({id, title}) => <h2 key={id} element="div">{title}</h2>) }
    </div>
  )
}

export default PostList
