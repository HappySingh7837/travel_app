import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./citySlice";

export const store = configureStore({
  reducer: {
    cities: cityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
