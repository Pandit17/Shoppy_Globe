import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

/**
 * Configure Redux store with cart slice
 */
const store = configureStore({
  reducer: {
    cart: cartReducer, // Cart slice
  },
});

export default store;
