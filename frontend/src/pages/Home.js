import React from 'react'
import axios from "../axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../redux/slices/posts";

const Home = () => {
    const dispatch = useDispatch()
    const {posts, tags} = useSelector(state => state.posts)
    const isPostLoading = posts.status === 'loading'

    React.useEffect(() => {
        dispatch(fetchPosts())
    }, [])
    console.log(posts)

    return (
        <div>
            <grid>
                {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostLoading ? (
                    <post key={index} isLoading={true}/>) : (
                    <post>
                        post
                    </post>
                ))}
            </grid>
            home
            home
            home
        </div>
    )


}

export default Home