import React from 'react';
import PostProvider from '../contexts/posts-context.js';
import PostList from './posts';
import PostCreate from './postCreate';

function App() {
  return (
    <PostProvider>
      <main className="[ sm:container mx-auto w-11/12 md:w-auto ]">
        <PostCreate />
        <PostList />
      </main>
    </PostProvider>
  );
}

export default App;
