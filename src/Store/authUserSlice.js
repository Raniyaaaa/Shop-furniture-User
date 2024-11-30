import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('Token') || null,
  username: localStorage.getItem('Username') || '',
  isLoggedIn: !!localStorage.getItem('Token'),
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem('Token', state.token);
      localStorage.setItem('Username', state.email);
    },

    logout(state) {
      state.token = null;
      state.username = '';
      state.isLoggedIn = false;
      localStorage.removeItem('Token');
      localStorage.removeItem('Username');
    },
  },
});

export const { login, logout } = authUserSlice.actions;

export default authUserSlice.reducer;
