import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import registerReducer from "./Features/registerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
