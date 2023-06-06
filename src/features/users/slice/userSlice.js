import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// const initialState = [
//     { id: "0", name: "Dude Lebowski" },
//     { id: "1", name: "Neil Young" },
//     { id: "2", name: "Muzammil Ali" }
// ]

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL);
        const data = response.data;
        return data;
    } catch (error) {
        return error.message;
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {

            // We did not push/concat/spread out the data in the initalState which was an empty array []
            // to avoid the dupication of users, we have completely overwritting the state
            // by returning the 'action.payload', Immer Js will handel this and re-writes/over-writes
            // the initalState if it get a simple return statment not a state specific action.

            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;

// export const { postAdded } = usersSlice.actions

export default usersSlice.reducer