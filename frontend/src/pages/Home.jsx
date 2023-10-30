import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags} from "../redux/slices/posts";

export const Home = () => {
    const dispatch = useDispatch()
    const {posts,tags}= useSelector(state => state.posts)
    const isPostsLoading = posts.status ==='Loading'
    const isTagsLoading = tags.status ==='Loading'
    const userData = useSelector((state)=>state.posts)

    React.useEffect(()=>{
        dispatch(fetchPosts())
        dispatch(fetchTags())
    },[])
    console.log(posts)

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index)=>
              isPostsLoading ? (<Post key={index} isLoading={true}/>) : (
                  <Post
                      id={obj._id}
                      title={obj.title}
                      imageUrl={obj.imageUrl}
                      user={obj.users}
                          createdAt={'10 november 2023'}
                      viewsCount={obj.viewsCount}
                      commentsCount={obj.commentsCount}
                      tags={obj.tags}
                      isEditable = {userData._id == obj._id} /*





                      mb future problem obj.user._id






                      */
                  />
              ),)}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Test Name 1',
                  avatarUrl: '',
                },
                text: 'Test comment',
              },
              {
                user: {
                  fullName: 'test NAme 2',
                  avatarUrl: '',
                },
                text: 'text text text text text text',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};