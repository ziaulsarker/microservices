import React from "react";

export interface Post {
    id: string;
    title: string;
    content?: string;
    Element: React.ReactElement
}



export interface UseFetchPostsInterfaces {
    posts?: Post[];
    setPosts?: any;
}
