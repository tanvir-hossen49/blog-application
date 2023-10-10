import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: null,
}

const myPostsSlice = createSlice({
    name: 'myPosts',
    initialState,
    reducers: {
        addMyPost(state, action) {
            state.posts = action.payload
        },
        updatePost(state, action) {
            const postId = action.payload.$id;
            state.posts = state.posts.map(post => (
                post.id === postId ? {...post, ...action.payload.data} : post
            ))
        },
        addSinglePost(state, action) {
            state.posts.push(action.payload);
        },
        deleteSinglePost(state, action) {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.$id !== postId);
        }
    }
});

export const { addMyPost, updatePost, addSinglePost, deleteSinglePost } = myPostsSlice.actions;
export default myPostsSlice.reducer;