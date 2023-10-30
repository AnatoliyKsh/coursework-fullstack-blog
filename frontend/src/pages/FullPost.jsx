import React from "react";
import {useParams} from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {


    const [data,setData] = React.useState()
    const [isLoading,setLoading] = React.useState(true)
    const { id} = useParams()

    React.useEffect(()=>{
        axios
            .get(`/posts/${id}`)
            .then((res)=>{
            setData(res.data)
                setLoading(false)
        })
            .catch((err)=>{
                console.warn(err)
                alert("error article")
            })
    }, [])

if (isLoading){
    return <Post isLoading={isLoading} isFullPost />
}
  return (
    <>
      <Post
          id={data._id}
          title={data.title}
          imageUrl={data.imageUrl}
          user={data.users}
          createdAt={'12 november 2090'}
          viewsCount={data.viewsCount}
          commentsCount={data.commentsCount}
          tags={data.tags}
          isEditable
        tags={data.tags}
        isFullPost>
        <p>
            {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Test Name 1",
              avatarUrl: "",
            },
            text: "Test comment 1",
          },
          {
            user: {
              fullName: "Test name 2",
              avatarUrl: "",
            },
            text: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text ",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
