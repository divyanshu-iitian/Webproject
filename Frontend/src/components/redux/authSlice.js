import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  user: null, // Will hold the user data once logged in
  token: null, // Will hold the JWT token if applicable
  isAuthenticated: false, // Tracks the user's authentication state
  loading: false, // Tracks loading state during login or signup
  error: null, // Will store error messages
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Start the login request
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    // Successful login
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Login failure
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    // Start the signup request
    signupRequest(state) {
      state.loading = true;
      state.error = null;
    },
    // Successful signup
    signupSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Signup failure
    signupFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    // Logout action to reset state
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export the actions
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
