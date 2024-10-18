import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"; // Import correctly

const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store;
