import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import Axios from "axios";

export const postFeed = createAsyncThunk(
    "post/feed",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            const formData = new FormData();
            formData.append(
                "upload_preset",
                process.env.REACT_APP_UPLOAD_PRESET
            );
            formData.append("file", data.imageFile);
            let url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY}/image/upload`;
            let apiCall = await Axios.post(url, formData, {
                onUploadProgress: (progress) => {
                    let download = Math.floor(
                        (progress.loaded * 100) / progress.total
                    );
                    data.onUpload(download);
                },
            });
            let response = await axios.post(
                "/post/create",
                {
                    content: data.content,
                    imageURL: apiCall.data.secure_url,
                },

                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );
            return response.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const getFeed = createAsyncThunk(
    "get/feeds",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let response = await axios.get("/feeds", {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            return response.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const putLike = createAsyncThunk(
    "like/post",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.put(
                `/post/like/${data.id}`,
                {},
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const putUnlike = createAsyncThunk(
    "unlike/post",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.put(
                `/post/unlike/${data.id}`,
                {},
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const deletePost = createAsyncThunk(
    "delete/post",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.delete(`/post/delete/${data.id}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const getProfile = createAsyncThunk(
    "get/profile",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.get(`/user/profile/${data.username}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            console.log(apiCall);
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const getUserPosts = createAsyncThunk(
    "user/post",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }

            let apiCall = await axios.get(`/post/user/${data.username}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            console.log(apiCall.data);
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const changeImage = createAsyncThunk(
    "change/image",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }
            const formData = new FormData();
            formData.append(
                "upload_preset",
                process.env.REACT_APP_UPLOAD_PRESET
            );
            formData.append("file", data.imageFile);
            let url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY}/image/upload`;
            let apiCall = await Axios.post(url, formData);
            let response = await axios.put(
                "/user/update",
                {
                    profileURL: apiCall.data.secure_url,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );
            return response.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "update/profile",
    async (data, { rejectWithValue }) => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }
            const update = {};
            for (let key in data) {
                if (data[key]) {
                    update[key] = data[key];
                }
            }
            let apiCall = await axios.put("/user/update", update, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            return apiCall.data.data;
        } catch (err) {
            if (err.response.status === 500) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);
const PostSlice = createSlice({
    name: "post",
    initialState: {
        data: {},
        posts: [],
        isLoading: false,
        error: null,
        profile: {},
        isProfileLoading: false,
        imageUploading: false,
        profileUpdating: false,
    },
    reducers: {},

    extraReducers: {
        [postFeed.pending]: (state, action) => {
            state.imageUploading = true;
            state.error = "";
        },
        [postFeed.fulfilled]: (state, action) => {
            state.imageUploading = false;
            state.error = "";
            state.data = action.payload;
            state.posts = [...state.posts, action.payload].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        },
        [postFeed.rejected]: (state, action) => {
            state.imageUploading = false;
            state.error = action.payload;
        },

        [getFeed.pending]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },
        [getFeed.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.posts = action.payload;
        },
        [getFeed.rejected]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },

        [putLike.pending]: (state, action) => {
            // state.isLoading = true;
            state.error = "";
        },
        [putLike.fulfilled]: (state, action) => {
            // state.isLoading = false;
            state.error = "";
            let store = state.posts.find((post) => {
                return post._id === action.payload._id;
            });
            store.likedBy = action.payload.likedBy;
        },
        [putLike.rejected]: (state, action) => {
            // state.isLoading = true;
            state.error = "";
        },

        [putUnlike.pending]: (state, action) => {
            // state.isLoading = true;
            state.error = "";
        },
        [putUnlike.fulfilled]: (state, action) => {
            // state.isLoading = false;
            state.error = "";
            let store = state.posts.find((post) => {
                return post._id === action.payload._id;
            });
            store.likedBy = action.payload.likedBy;
        },
        [putUnlike.rejected]: (state, action) => {
            // state.isLoading = true;
            state.error = "";
        },

        [deletePost.pending]: (state, action) => {
            // state.isLoading = true;
            state.error = "";
        },
        [deletePost.fulfilled]: (state, action) => {
            // state.isLoading = true;
            state.error = "";
            let store = state.posts.filter((post) => {
                return post._id !== action.payload._id;
            });
            state.posts = store;
        },
        [deletePost.rejected]: (state, action) => {
            // state.isLoading = true;
            state.error = action.payload;
        },

        [getProfile.pending]: (state, action) => {
            state.isProfileLoading = true;
            state.error = "";
        },
        [getProfile.fulfilled]: (state, action) => {
            state.isProfileLoading = false;
            state.error = "";
            state.profile = action.payload;
        },
        [getProfile.rejected]: (state, action) => {
            state.isProfileLoading = false;
            state.error = action.payload;
        },

        [getUserPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },
        [getUserPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.posts = action.payload;
        },
        [getUserPosts.rejected]: (state, action) => {
            state.isLoading = true;
            state.error = "";
        },
        [changeImage.pending]: (state, action) => {
            state.imageUploading = true;
            state.error = "";
        },
        [changeImage.fulfilled]: (state, action) => {
            state.imageUploading = false;
            state.error = "";
        },
        [changeImage.rejected]: (state, action) => {
            state.imageUploading = false;
            state.error = "";
        },
        [updateProfile.pending]: (state, action) => {
            state.profileUpdating = true;
            state.error = "";
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.profileUpdating = false;
            state.error = "";
        },
        [updateProfile.rejected]: (state, action) => {
            state.profileUpdating = false;
            state.error = "";
        },
    },
});

export default PostSlice.reducer;
