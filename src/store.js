import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import postReducer from "./Features/Post/PostSlice";

export const store = configureStore({
    reducer: { auth: authReducer, post: postReducer },
});
