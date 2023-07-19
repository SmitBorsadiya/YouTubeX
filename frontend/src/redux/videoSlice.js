import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideo: null,
    loading: false,
    error: false
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        like: (state, action) => {
            if (!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload)
                
                //splice method - Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
                state.currentVideo.dislikes.splice(
                    state.currentVideo.dislikes.findIndex(
                        (UserId) => UserId === action.payload
                    ), 1
                );
            }
        },
        dislike: (state, action) => {
            if (!state.currentVideo.dislikes.includes(action.payload)) {
                state.currentVideo.dislikes.push(action.payload)
                state.currentVideo.likes.splice(
                    state.currentVideo.likes.findIndex(
                        (UserId) => UserId === action.payload
                    ), 1
                );
            }
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;