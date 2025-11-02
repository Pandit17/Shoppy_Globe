import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state of the cart
 * - items: object mapping product IDs to { product, quantity }
 * - searchQuery: current search text for filtering products
 */
const initialState = {
  items: {},
  searchQuery: "",
};

/**
 * Redux slice for cart functionality
 * Handles adding/removing items, quantity changes, clearing cart, and search query
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add a product to the cart
     * If product already exists, increment its quantity
     */
    addToCart(state, action) {
      const product = action.payload;
      if (!product?.id) return;
      const id = product.id;

      if (!state.items[id]) {
        state.items[id] = { product, quantity: 1 };
      } else {
        state.items[id].quantity += 1;
      }
    },

    /**
     * Remove a product from the cart completely
     */
    removeFromCart(state, action) {
      const id = action.payload;
      if (state.items[id]) delete state.items[id];
    },

    /**
     * Increase quantity of a product in the cart
     */
    incrementQuantity(state, action) {
      const id = action.payload;
      if (state.items[id]) state.items[id].quantity += 1;
    },

    /**
     * Decrease quantity of a product in the cart, minimum is 1
     */
    decrementQuantity(state, action) {
      const id = action.payload;
      if (state.items[id])
        state.items[id].quantity = Math.max(1, state.items[id].quantity - 1);
    },

    /**
     * Clear all items from the cart
     */
    clearCart(state) {
      state.items = {};
    },

    /**
     * Set the search query for filtering products
     */
    setSearchQuery(state, action) {
      state.searchQuery = action.payload || "";
    },

    /**
     * Replace the cart entirely with a new items object
     * Useful for restoring from localStorage or server
     */
    setCart(state, action) {
      state.items = action.payload || {};
    },
  },
});

// Export actions for use in components
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setSearchQuery,
  setCart,
} = cartSlice.actions;

// Export the reducer to configure store
export default cartSlice.reducer;
