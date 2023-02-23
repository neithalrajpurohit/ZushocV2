import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const SignupUser = createAsyncThunk(
    "auth/signup",
    async (data, { rejectWithValue }) => {
        try {
            let apiCall = await axios.post(`/auth/signup`, data);
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 400) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);
export const LoginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            let apiCall = await axios.post(`auth/login`, data);

            localStorage.setItem("user", JSON.stringify(apiCall.data.data));
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 409) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);
export const getLoggedInUser = createAsyncThunk(
    "auth/getLoggedInUser",
    async (_, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.get("auth/user", {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 409) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);
export const getAllUsers = createAsyncThunk(
    "getall/user",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.get("/user/all?page=1&limit=100", {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            console.log(apiCall.data.data);
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 409) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);
export const followUser = createAsyncThunk(
    "follow/user",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.post(
                "/user/follow",
                {
                    followUserId: data.id,
                },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 409) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);
export const unFollowUser = createAsyncThunk(
    "Unfollow/user",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.post(
                "/user/unfollow",
                {
                    unFollowUserId: data.id,
                },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 409) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const getUsersBySearch = createAsyncThunk(
    "search/user",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.get(
                `/user/search?username=${data.username}`,
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
            console.log(apiCall.data.data);
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 409) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);
const initialState = {
    data: {
        name: "",
        username: "",
        email: "",
        password: "",
    },
    isLoading: false,
    error: null,
    isAccountCreated: false,
    user: {},
    users: [],
};

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        clearState: (state) => {
            state.data.name = "";
        },
        clearError: (state) => {
            state.error = "";
        },
    },
    extraReducers: {
        [SignupUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [SignupUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
            state.isAccountCreated = true;
        },
        [SignupUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [LoginUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
            state.isAccountCreated = false;
        },
        [LoginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        },
        [LoginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getLoggedInUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },
        [getLoggedInUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        [getLoggedInUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getAllUsers.pending]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.users = action.payload;
        },
        [getAllUsers.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [followUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },
        [followUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            let findUser = state.users.find((user) => {
                return user._id === action.payload._id;
            });
            // findUser.followersList.push(action);
        },
        [followUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = "";
        },
        [unFollowUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },
        [unFollowUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            let findUser = state.users.find((user) => {
                return user._id === action.payload._id;
            });
            // findUser.followersList.push(action);
        },
        [unFollowUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = "";
        },

        [getUsersBySearch.pending]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },
        [getUsersBySearch.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.users = action.payload;
        },
        [getUsersBySearch.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});
export const { clearState, clearError } = AuthSlice.actions;
export default AuthSlice.reducer;
