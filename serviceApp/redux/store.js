import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./serviceSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
