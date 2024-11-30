import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUserSlice';
import userReducer from './userSlice';
import searchReducer from './searchSlice'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    user: userReducer,
    search: searchReducer,
  },
});
export default store;
