import React, { useEffect, useState } from "react";

function PostsList(props) {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const res = await fetch("http://127.0.0.1:4000/posts");
        const fetchedPosts = await res.json();
        setPosts(fetchedPosts);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="col-sm-6 pl-0">
            <h6 className="mt-5">Comments</h6>
            {Object.values(posts).map((x) => (
                <div key={x.id} className="card [ my-3 ]">
                    <div className="card-body">{x.title}</div>
                </div>
            ))}
        </div>
    );
}

export default PostsList;
