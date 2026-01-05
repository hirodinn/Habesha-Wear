import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  register,
  logout,
  fetchCurrentUser,
} from "../services/authService";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      await login(email, password);
      // Login endpoint only returns message, so we must fetch user details
      const user = await fetchCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await register(userData);
      // Register endpoint returns the user object directly
      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await logout();
  return null;
});

export const loadUser = createAsyncThunk("user/load", async () => {
  const user = await fetchCurrentUser();
  return user;
});

export function toggleDarkMode() {
  return {
    type: "TOGGLE_DARK_MODE",
  };
}
