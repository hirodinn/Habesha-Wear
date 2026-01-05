import { createReducer } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, loadUser } from "./userAction";

const initialState = {
  user: null,
  darkMode: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("TOGGLE_DARK_MODE", (state) => {
      state.darkMode = !state.darkMode;
    })
    // Login
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Register
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Logout
    .addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    })
    // Load User
    .addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
});
