import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, LoginMutation, RegisterMutation, User, ValidationError} from '../types';
import {isAxiosError} from 'axios';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';
import {unsetUser} from './usersSlice';

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>('users/register', async (RegisterMutation, {rejectWithValue}) => {
  try {
    const {data: user} = await axiosApi.post<User>('/users', RegisterMutation);
    return user;
  } catch (e) {
    if(isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>('users/login', async (loginMutation, {rejectWithValue}) => {
  try {
    const {data: user} = await axiosApi.post<User>('/users/sessions', loginMutation);
    return user;
  } catch (e) {
    if(isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const logout = createAsyncThunk<void, void, {state: RootState}>('users/logout', async (_arg, {getState, dispatch}) => {
  const token = getState().users.user?.token;
  await axiosApi.delete('/users/sessions', {headers: {'Authorization': `Bearer ${token}`}});
  dispatch(unsetUser());
});