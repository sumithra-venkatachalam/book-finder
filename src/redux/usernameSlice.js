import { createSlice } from "@reduxjs/toolkit";

const usernameSlice = createSlice({
    name: "username",
    initialState: {value: ""},
    reducers: {
        username: (state, action) => {
            state.value = action.payload
        },
        clearUsername: (state) => {
            state.value = ""
        }
    }
})

export const { username, clearUsername } = usernameSlice.actions;
export default usernameSlice.reducer