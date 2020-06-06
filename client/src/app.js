import React from "react";
import PostCreate from "./postCreate";
import PostList from "./postList";

function App(props) {
    return (
        <div className="container">
            <h1> Create Post</h1>
            <PostCreate />
            <PostList />
        </div>
    );
}

export default App;
