import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action) {
            state.posts = action.payload
        },
        updatePost(state, action) {
            state.posts = [...state.posts, action.payload];
        }
    }
});

export const { addPost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;