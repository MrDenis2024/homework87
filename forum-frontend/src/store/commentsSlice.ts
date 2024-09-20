import {createSlice} from '@reduxjs/toolkit';
import {createComment, fetchComments} from './commentsThunks';
import {Comment} from '../types';

export interface CommentsState {
  createCommentLoading: boolean;
  fetchLoading: boolean;
  comments: Comment[],
}

const initialState: CommentsState = {
  createCommentLoading: false,
  fetchLoading: false,
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state: CommentsState) => {
      state.createCommentLoading = true;
    }).addCase(createComment.fulfilled, (state: CommentsState) => {
      state.createCommentLoading = false;
    }).addCase(createComment.rejected, (state: CommentsState) => {
      state.createCommentLoading = false;
    });

    builder.addCase(fetchComments.pending, (state: CommentsState) => {
      state.fetchLoading = true;
    }).addCase(fetchComments.fulfilled, (state: CommentsState, {payload: comments}) => {
      state.fetchLoading = false;
      state.comments = comments;
    }).addCase(fetchComments.rejected, (state: CommentsState) => {
      state.fetchLoading = false;
    });
  },
  selectors: {
    selectorCreateCommentLoading: (state: CommentsState) => state.createCommentLoading,
    selectorFetchCommentLoading: (state: CommentsState) => state.fetchLoading,
    selectorComments: (state: CommentsState) => state.comments,
  },
});

export const commentsReducer = commentsSlice.reducer;
export const {
  selectorCreateCommentLoading,
  selectorFetchCommentLoading,
  selectorComments,
} = commentsSlice.selectors;