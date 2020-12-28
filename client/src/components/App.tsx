import React from 'react';
import PostProvider from '../contexts/posts-context.js';
import PostList from './posts';

function App() {
  return (
    <PostProvider>
      <PostList />
    </PostProvider>
  );
}

export default App;
