import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id: "1",
        title: "Learning Redux Toolkit",
        content: "I have heared good things about Redux Toolkit",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        }
    },
    {
        id: "2",
        title: "Creating Slices ....",
        content: "The more I say slice, the more I want pizza...",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        }
    }
]

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
                state.push(action.payload)
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
            const existingPost = state.find((post) => post.id === action.payload.postId)
            if(existingPost){
                // using the Immer Js for Mutation in Slice, this will also work
                // and will update the state's reaction of the Find Post.
                existingPost.reactions[action.payload.reaction]++
            }
        }
    },
})

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer