import { configureStore } from "@reduxjs/toolkit";
import usernameSlice from "./redux/usernameSlice";

const store = configureStore({
    reducer: {
        username: usernameSlice,
    }
})

export default store;