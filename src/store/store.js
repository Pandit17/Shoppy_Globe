// Import configureStore from Redux Toolkit to create the store
import { configureStore } from "@reduxjs/toolkit";

// Import the cart slice reducer to manage cart state
import cartReducer from "./cartSlice";

/**
 * Configure and create the Redux store
 * - Combines different slice reducers into a single root reducer
 * - Currently, only 'cart' slice is included
 */
const store = configureStore({
  reducer: {
    cart: cartReducer, // 'cart' state will be managed by cartReducer
  },
  /**
   * Middleware and devTools are automatically included by Redux Toolkit
   * - Middleware handles async actions, logging, etc.
   * - Redux DevTools extension enabled in development for debugging
   */
});

// Export the configured store for use in <Provider> in main.jsx
export default store;
