import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  success: false,
  isLoading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signup: (state, action) => {
      (state.isLoading = true),
        (state.user = action.payload),
        state.success == true;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { signup, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
