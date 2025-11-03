import React from "react";
import PropTypes from "prop-types"; // For type-checking props
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { removeFromCart, incrementQuantity, decrementQuantity } from "../store/cartSlice"; // Redux actions for cart management
import formatCurrency from "../utils/formatCurrency"; // Utility to format numbers as currency

/**
 * CartItem component: renders a single product in the cart
 * Allows quantity adjustment and removal
 * 
 * @param {Object} props
 * @param {Object} props.item - The cart item containing product and quantity
 */
export default function CartItem({ item }) {
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
  const { product, quantity } = item; // Destructure product details and quantity

  return (
    <div className="cart-item">
      {/* ===============================
           Product Image
           =============================== */}
      <img src={product.thumbnail} alt={product.title} loading="lazy" />

      {/* ===============================
           Product Metadata (Title & Price)
           =============================== */}
      <div className="meta">
        <h4>{product.title}</h4>
        {/* Display price formatted as currency */}
        <p>{formatCurrency(product.price)}</p>
      </div>

      {/* ===============================
           Quantity Controls and Remove Button
           =============================== */}
      <div className="controls">
        {/* Decrease quantity */}
        <button 
          onClick={() => dispatch(decrementQuantity(product.id))} 
          aria-label="decrease"
        >
          −
        </button>

        {/* Display current quantity */}
        <span>{quantity}</span>

        {/* Increase quantity */}
        <button 
          onClick={() => dispatch(incrementQuantity(product.id))} 
          aria-label="increase"
        >
          +
        </button>

        {/* Remove item from cart */}
        <button 
          className="remove" 
          onClick={() => dispatch(removeFromCart(product.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

/**
 * PropTypes validation
 * Ensures the item prop has the correct shape
 */
CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.object.isRequired, // Product object must exist
    quantity: PropTypes.number.isRequired, // Quantity must exist
  }).isRequired,
};
