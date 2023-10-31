import React from "react";
import {useParams} from "react-router-dom";
import {Post} from "../components/Post";
import {Index} from "../components/AddComment";
import {CommentsBlock} from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {


    const [data, setData] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const {id} = useParams()

    /* in this useEffect, an HTTP GET request is made to fetch data from an
     API endpoint, specifically /posts/${id}, where id appears to be a variable
      parameter. Upon a successful response, the retrieved data is set using setData,
       and the loading state is turned off. In case of an error, it logs a warning
       and displays an alert message indicating an error with the article
       The useEffect runs when the component mounts */
    React.useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.warn(err)
                alert("error article")
            })
    }, [])

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }
    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
                user={{
                    avatarUrl:
                        'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                    fullName: 'Anatoliy',
                }}
                createdAt={'12 november 2090'}
                viewsCount={data.viewsCount}
                commentsCount={data.commentsCount}
                tags={data.tags}
                isEditable
                tags={data.tags}
                isFullPost>
                <ReactMarkdown children={data.text}/>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Test User",
                            avatarUrl: "",
                        },
                        text: "Wow it is so cool hand, I like it ",
                    },
                ]}
                isLoading={false}
            >
                <Index/>
            </CommentsBlock>
        </>
    );
};
