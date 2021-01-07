import React from "react";

export interface Comment {
    commentId: string;
    content: string;
}

export interface Post {
    postId: string;
    title: string;
    content?: string;
    comments?: Comment[];
}

export interface UseFetchPostsInterfaces {
    posts?: Post;
    setPosts?: (posts: Post[]) => void;
    query?: Post;
    setQuery?: (query: Post) => void;
}
