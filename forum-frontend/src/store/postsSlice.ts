import {PostWithCount, ValidationError} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createPost, fetchPosts} from './postsThunks';

export interface PostsState {
  fetchPostsLoading: boolean;
  posts: PostWithCount[];
  createPostLoading: boolean;
  createPostError: ValidationError | null;
}

const initialState: PostsState = {
  fetchPostsLoading: false,
  posts: [],
  createPostLoading: false,
  createPostError: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state: PostsState) => {
      state.fetchPostsLoading = true;
    }).addCase(fetchPosts.fulfilled, (state: PostsState, {payload: posts}) => {
      state.fetchPostsLoading = false;
      state.posts = posts;
    }).addCase(fetchPosts.rejected, (state: PostsState) => {
      state.fetchPostsLoading = false;
    });

    builder.addCase(createPost.pending, (state: PostsState) => {
      state.createPostLoading = true;
      state.createPostError = null;
    }).addCase(createPost.fulfilled, (state: PostsState) => {
      state.createPostLoading = false;
    }).addCase(createPost.rejected, (state: PostsState, {payload: error}) => {
      state.createPostLoading = false;
      state.createPostError = error || null;
    });
  },
  selectors: {
    selectorFetchPostsLoading: (state: PostsState) => state.fetchPostsLoading,
    selectorPosts: (state: PostsState) => state.posts,
    selectorCreatePostLoading: (state: PostsState) => state.createPostLoading,
    selectorCreatePostError: (state: PostsState) => state.createPostError,
  },
});

export const postsReducer = postsSlice.reducer;
export const {
  selectorFetchPostsLoading,
  selectorPosts,
  selectorCreatePostLoading,
  selectorCreatePostError,
} = postsSlice.selectors;