import React, { useContext, useMemo } from "react";
import { DataContext } from "./context/context";

function PostsList(props) {
    const { posts } = useContext(DataContext);
    console.log(posts);

    const memoPosts = useMemo(() => {
        return (
            <div className="col-sm-6 pl-0">
                <h6 className="mt-5 ">
                    {Object.keys(posts).length > 1 && "Posts"}
                </h6>
                {Object.values(posts)
                    .map((x) => (
                        <div key={x.id} className="card [ my-3 ]">
                            <div className="card-body">{x.title}</div>
                        </div>
                    ))
                    .reverse()}
            </div>
        );
    }, [posts]);

    return memoPosts;
}

export default PostsList;
