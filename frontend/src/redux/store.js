import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";


/* redux defines the store's initial state and reducers,
specifically for managing the 'posts' and 'auth' parts of the
application's state. The 'postsReducer' and 'authReducer' are
responsible for handling state changes related to posts and user
authentication, respectively*/

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }

})
export default store