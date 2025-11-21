import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state of cart
 * - items: object mapping product IDs to { product, quantity }
 * - searchQuery: current text for filtering products
 */
const initialState = {
  items: {},
  searchQuery: "",
};

/**
 * Cart slice: handles cart state and actions
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add a product to cart
     * - Increment quantity if already in cart
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
     * Remove product from cart
     */
    removeFromCart(state, action) {
      const id = action.payload;
      if (state.items[id]) delete state.items[id];
    },

    /**
     * Increment quantity of a product
     */
    incrementQuantity(state, action) {
      const id = action.payload;
      if (state.items[id]) state.items[id].quantity += 1;
    },

    /**
     * Decrement quantity of a product (min 1)
     */
    decrementQuantity(state, action) {
      const id = action.payload;
      if (state.items[id]) state.items[id].quantity = Math.max(1, state.items[id].quantity - 1);
    },

    /**
     * Clear the cart
     */
    clearCart(state) {
      state.items = {};
    },

    /**
     * Set search query for product filtering
     */
    setSearchQuery(state, action) {
      state.searchQuery = action.payload || "";
    },

    /**
     * Replace entire cart (e.g., from localStorage)
     */
    setCart(state, action) {
      state.items = action.payload || {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setSearchQuery,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
