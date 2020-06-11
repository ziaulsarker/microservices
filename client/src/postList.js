import React, { useContext, useMemo } from "react";
import { DataContext } from "./context/context";
import CommentCreate from "./commentCreate";
import CommentList from "./commentList";

function PostsList(props) {
    const { posts } = useContext(DataContext);

    const memoPosts = useMemo(() => {
        return (
            <div className="col-sm-6 pl-0">
                <h6 className="mt-5 ">
                    {Object.keys(posts).length > 1 && "Posts"}
                </h6>
                {Object.values(posts)
                    .map((x) => (
                        <div id={x.id} key={x.id} className="card [ my-3 ]">
                            <div className="card-body">{x.title}</div>
                            <div className="[ col-sm-8 / mt-3]">
                                <CommentCreate postID={x.id} />
                            </div>
                        </div>
                    ))
                    .reverse()}
            </div>
        );
    }, [posts]);

    return memoPosts;
}

export default PostsList;
