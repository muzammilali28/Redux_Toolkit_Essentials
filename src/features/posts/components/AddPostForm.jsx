import { useState } from "react";
// import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";

import { postAdded } from "../slice/postsSlice"
import { selectAllUsers } from "../../users/slice/userSlice"

const AddPostForm = () => {

    // const submitRef = useRef();

    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserID] = useState("")

    const users = useSelector(selectAllUsers)

    const postSubmitted = (e) => {

        e.preventDefault();

        if (title && content) {

            // First Method of Dispatch to the Slice
            // sending the payload manually everytime
            // if the functionalty is fixed through out.
            // dispatch(postAdded({
            //     id: nanoid(),
            //     title,
            //     content
            // }))

            // Second Method is a bit easier, need to implement
            // the payload login in the Slice, if for a fact that we know
            // the functionality will be the same always.

            dispatch(postAdded(title, content, userId))
        }

        setTitle("")
        setContent("")
    }

    // 2nd way to disable a button is by using the
    // useRef and changing the DOM element's attribute
    // forecefully

    // if(title && content){
    //     if(submitRef.current.disabled === true){
    //         submitRef.current.disabled = false
    //     }
    //     console.log(submitRef.current.disabled)
    // }
    // else{
    //     if(submitRef.current.disabled === false){
    //         submitRef.current.disabled = true
    //     }
    // }

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    // 1st Way is a but simpler and easy to write if you just want to
    // change the disable button functionality
    // This way will only work if there is no state mutation
    // taking place frequently.
    const canSubmit = Boolean(title) && Boolean(content)
    console.log(canSubmit)
    // Boolean returns true of the content sent inside is "NOT EMPTY", if empty it will return False

    return (
        <section>
            <h2>Add New Post</h2>
            <form onSubmit={postSubmitted}>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={(e) => setUserID(e.target.value)}
                >
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postTitle">Post Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    type="submit"
                    // 1st Way will also work the same for
                    // disabling the button
                    disabled={!canSubmit}

                // 2nd Way will also work the same just like
                // the first way above. You can use both approaches.

                // disabled={true}
                // ref={submitRef}
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostForm