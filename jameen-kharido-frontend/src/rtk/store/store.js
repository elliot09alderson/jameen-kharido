import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
import adSlice from "../slices/adSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ad: adSlice,
  },
});
