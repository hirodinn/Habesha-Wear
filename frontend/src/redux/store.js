import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
  },
});
