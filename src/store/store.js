import { configureStore } from "@reduxjs/toolkit"; // Function to configure Redux store
import cartReducer from "./cartSlice"; // Import the cart slice reducer

/**
 * Configure and create Redux store
 * Combines reducers for different slices (currently only 'cart')
 */
const store = configureStore({
  reducer: {
    cart: cartReducer, // Attach cart slice to 'cart' state
  },
});

export default store;
