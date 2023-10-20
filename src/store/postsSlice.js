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
        updateLikes: (state, action) => {
            const { articleId, newLikes, likedBy } = action.payload;
            const article = state.posts.find(article => article.$id === articleId);
            if (article) {
              article.likes = newLikes;
              article.likedBy = likedBy
            }
        },
        searchUser: (state, action) => {
            state.searchData = action.payload
        }
    }
});

export const { addPost, searchUser, updateLikes } = postsSlice.actions;
export default postsSlice.reducer;