import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

/*  function to handle fetching posts asynchronously from an API endpoint.
When dispatched, it makes a GET request to '/posts', extracts and returns
the data from the response */

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data
})

/*  function to handle fetching posts asynchronously from an API endpoint.
When dispatched, it makes a GET request to '/tags', extracts and returns
the data from the response */

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

/* when dispatched, it sends a DELETE request to the API endpoint associated
with a specific post id  */

export const fetchRemovePost = createAsyncThunk('posts/fetchTags', async (id) => {
    ;
    axios.delete(`/posts/${id}`)
})

/* initial sates for posts and tags */

const initialState = {
    posts: {
        item: [],
        status: 'Loading',
    },
    tags: {
        item: [],
        status: 'Loading',
    },
}

/* creating a slice */

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {

        // posts
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        //tags
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        //remove post
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id === action.payload);
        },


    }
})

export const postsReducer = postsSlice.reducer