import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/slice/postsSlice";
import usersReducer from "../features/users/slice/userSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})