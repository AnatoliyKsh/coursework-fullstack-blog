import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

/*  function to handle fetching posts asynchronously from an API endpoint.
When dispatched, it makes a POST request to '/auth/login', extracts and returns
the data from the response */


export const fetchUserData = createAsyncThunk('auht/fetchUserData', async (params) => {
    const {data} = await axios.post('/auth/login', params)
    return data
})

/*  function to handle fetching posts asynchronously from an API endpoint.
When dispatched, it makes a POST request to '/auth/register', extracts and returns
the data from the response */


export const fetchRegister = createAsyncThunk('auht/fetchRegister', async (params) => {
    const {data} = await axios.post('/auth/register', params)
    return data
})

/*  function to handle fetching posts asynchronously from an API endpoint.
When dispatched, it makes a GET request to '/auth/me', extracts and returns
the data from the response */


export const fetchAuthMe = createAsyncThunk('auht/fetchUserData', async () => {
    const {data} = await axios.get('/auth/me')
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}
//creating a slice for app
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        //user data
        [fetchUserData.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUserData.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },

        // authentication
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },

        // register
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
    }
})
export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions