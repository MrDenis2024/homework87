import {createAsyncThunk} from '@reduxjs/toolkit';
import {Comment, CommentMutation} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const createComment = createAsyncThunk<void, CommentMutation, {state: RootState}>('comments/create', async (commentMutation, {getState}) => {
  const token = getState().users.user?.token;
  await axiosApi.post('comments', commentMutation, {headers: {'Authorization': `Bearer ${token}`}});
});

export const fetchComments = createAsyncThunk<Comment[], string>('comments/fetch', async (postId) => {
  const {data: comments} = await axiosApi.get(`/comments?post=${postId}`);
  return comments;
});