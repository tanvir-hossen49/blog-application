import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action) {
            state.posts = action.payload
        }
    }
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;