import {createAsyncThunk} from '@reduxjs/toolkit';
import {PostMutation, PostWithCount, ValidationError} from '../types';
import axiosApi from '../axiosApi';
import {isAxiosError} from 'axios';
import {RootState} from '../app/store';

export const fetchPosts = createAsyncThunk<PostWithCount[], void>('posts/fetch', async () => {
  const {data: posts} = await axiosApi.get<PostWithCount[]>('/posts');
  return posts;
});

export const createPost = createAsyncThunk<void, PostMutation, {state: RootState, rejectValue: ValidationError}>('posts/create', async (postMutation, {getState, rejectWithValue}) => {
  try {
    const token = getState().users.user?.token;
    const formData = new FormData();
    formData.append('title', postMutation.title);

    if(postMutation.description) {
      formData.append('description', postMutation.description);
    }

    if(postMutation.image) {
      formData.append('image', postMutation.image);
    }

    await axiosApi.post('/posts', formData, {headers: {'Authorization' : `Bearer ${token}`}});
  } catch (e) {
    if(isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});