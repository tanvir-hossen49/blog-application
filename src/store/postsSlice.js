import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: null,
    searchData: '', 
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action) {
            state.posts = action.payload
        },
        searchUser: (state, action) => {
            state.searchData = action.payload
        } 
    }
});

export const { addPost, searchUser } = postsSlice.actions;
export default postsSlice.reducer;