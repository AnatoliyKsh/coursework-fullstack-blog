import axios from "axios"

/* creates a new short path for axios so that you don’t
have to write all it every time you call it */

const instance = axios.create({
    baseURL: "http://localhost:4444"
});

/* This code adds an Axios interceptor for outgoing requests.
  This enables authentication for API requests by automatically attaching
   the stored token to the Authorization header before the request is sent*/
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instance