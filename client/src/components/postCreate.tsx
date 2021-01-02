import React, { useState, useRef, useContext } from 'react';
import {PostsContext} from "../contexts/posts-context";
import {UseFetchPostsInterfaces} from "../types/post-type";

const PostCreate = () : React.ReactElement => {
    const [formData, setFormData]: any = useState({});
    const [postTitle, setPostTitle]: any = useState("");

    const formRef = useRef(document.createElement('form'));
    const {setPosts} : UseFetchPostsInterfaces | any = useContext(PostsContext)


    const handleSubmitFormSubmit = async (event: any) => {
        event.preventDefault();
        const postEndpoint = 'http://127.0.0.1:3001/posts'
        const postOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        const response = await fetch(postEndpoint, postOptions);
        const posts = await response.json();

        setPosts(posts);
        setPostTitle(""); // reset form fata 
        setFormData({}); //reset formData
    }
    
    const handleTitleInputChange = async (event: any) => {
        const { value } = event.target;
        const formData = {title: value};
        console.log("val => ", value);
        console.log("formData => ", formData);

        setPostTitle(value);
        setFormData(formData);

    }
    

    return (
        <div className="[ my-2 ]">
            <form ref={formRef} onSubmit={handleSubmitFormSubmit}>
                <label className="[ mb-3 / text-gray-600 / block ]"> Create Post</label>
                <input onChange={handleTitleInputChange} type="text" placeholder="Create a Post" value={postTitle} className="border-2 border-green-500 border-opacity-75 md:border-opacity-50 px-2 py-1"/>
                <input type="submit" value="Create" className="border-2 border-green-500 border-opacity-75 md:border-opacity-50 px-2 py-1 bg-green-500"/>
            </form>
        </div>
    )
}

export default PostCreate
