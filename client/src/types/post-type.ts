import React from "react";

export interface Post {
    id: string;
    title: string;
    content?: string;
}



export interface UseFetchPostsInterfaces {
    posts?: Post;
    setPosts?: any;
}
