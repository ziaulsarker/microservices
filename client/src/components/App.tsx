import React from 'react';
import PostProvider from '../contexts/posts-context.js';
import PostList from './posts';
import PostCreate from './postCreate';

function App() {
  return (
    <PostProvider>
      <PostCreate />
      <PostList />
    </PostProvider>
  );
}

export default App;
