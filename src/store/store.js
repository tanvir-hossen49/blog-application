import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postsSlice from './postsSlice';
import myPostsSlice from './myPostsSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postsSlice,
        myPost: myPostsSlice
    }
});

export default store;