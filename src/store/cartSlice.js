// Import createSlice from Redux Toolkit to create a slice of the store
import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state of the cart slice
 * - items: object mapping product IDs to { product, quantity }
 * - searchQuery: stores current search text for filtering products
 */
const initialState = {
  items: {},       // Stores products in cart with their quantities
  searchQuery: "", // Stores current search input for filtering products
};

/**
 * Redux slice for cart functionality
 * - Provides actions and reducer for adding/removing items, updating quantities, clearing cart, and managing search query
 */
const cartSlice = createSlice({
  name: "cart",        // Name of this slice in the store
  initialState,        // Initial state defined above
  reducers: {
    /**
     * Add a product to the cart
     * - If product already exists, increment its quantity
     */
    addToCart(state, action) {
      const product = action.payload;
      if (!product?.id) return;  // Safety check: ignore if product has no ID
      const id = product.id;

      if (!state.items[id]) {
        state.items[id] = { product, quantity: 1 }; // Add new product with quantity 1
      } else {
        state.items[id].quantity += 1; // Increment quantity if product already exists
      }
    },

    /**
     * Remove a product from the cart completely
     */
    removeFromCart(state, action) {
      const id = action.payload;
      if (state.items[id]) delete state.items[id]; // Remove item by its ID
    },

    /**
     * Increase quantity of a product in the cart
     */
    incrementQuantity(state, action) {
      const id = action.payload;
      if (state.items[id]) state.items[id].quantity += 1; // Increment quantity
    },

    /**
     * Decrease quantity of a product in the cart, minimum quantity is 1
     */
    decrementQuantity(state, action) {
      const id = action.payload;
      if (state.items[id])
        state.items[id].quantity = Math.max(1, state.items[id].quantity - 1); // Prevent going below 1
    },

    /**
     * Clear all items from the cart
     */
    clearCart(state) {
      state.items = {}; // Reset cart to empty
    },

    /**
     * Set the search query for filtering products
     */
    setSearchQuery(state, action) {
      state.searchQuery = action.payload || ""; // Update search query
    },

    /**
     * Replace the cart entirely with a new items object
     * - Useful for restoring from localStorage or server data
     */
    setCart(state, action) {
      state.items = action.payload || {};
    },
  },
});

// Export all actions for use in components
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setSearchQuery,
  setCart,
} = cartSlice.actions;

// Export the reducer to configure the store
export default cartSlice.reducer;
