import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

// const initialState = [
//     {
//         id: "1",
//         title: "Learning Redux Toolkit",
//         content: "I have heared good things about Redux Toolkit",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         }
//     },
//     {
//         id: "2",
//         title: "Creating Slices ....",
//         content: "The more I say slice, the more I want pizza...",
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         }
//     }
// ]

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
}

// Prefix for generated action type
//     |
//     |
//     V
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        const data = response.data; // This hold the data from the Axios API GET method, the '.data'
        return data;  // The return from here is actually the 'action.payload' for the asyncThunk reducer.
    } catch (error) {
        return error;
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL, initialPost);
        const data = response.data;
        return data;
    } catch (error) {
        return error;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // First Way to Added the Data, via payload defined in the dispatch call
        // postAdded(state, action) {
        //     state.push(action.payload)
        // }

        // Second Way to Add the Data, using implementation logic
        // on the slice side.
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const existingPost = state.posts.find((post) => post.id === action.payload.postId)
            if (existingPost) {
                // using the Immer Js for Mutation in Slice, this will also work
                // and will update the state's reaction of the Find Post.
                existingPost.reactions[action.payload.reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    }
                    // return each post with the appended data added above. return the array of posts with these
                    // modifications and store them in loadedPosts variable.
                    return post;
                });
                // as the loadedPosts are an Array of Objects.
                // we can use 'spread operator' to fliter out each post and append it to the
                // initialState -> state.posts
                state.posts.push(...loadedPosts)  // concat(loadedPosts) works the same like append.
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, {payload}) => {
                payload.userId = Number(payload.userId);
                payload.date = new Date().toISOString();
                payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                }
                // The return value of addNewPost AsyncThunk Function is the payload
                // called via 'action.payload' but I have destructerd the action and just fecthed
                // the 'payload' prop.
                console.log(payload);
                
                state.posts.push(payload);
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer