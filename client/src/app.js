import React, { useMemo, useContext } from "react";
import PostCreate from "./postCreate";
import PostList from "./postList";

import Provider from "./context/context";

function App(props) {
    return (
        <Provider>
            <div className="container">
                <h1> Create Post</h1>
                <PostCreate />
                {<PostList />}
            </div>
        </Provider>
    );
}

export default App;
