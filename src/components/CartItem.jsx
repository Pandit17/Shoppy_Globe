import React from "react";
import PropTypes from "prop-types"; // Type-checking for props
import { useDispatch } from "react-redux"; // Hook to dispatch Redux actions
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice"; // Redux cart actions
import formatCurrency from "../utils/formatCurrency"; // Price formatting utility
import { Link } from "react-router-dom"; // Navigate to product details page
import { toast } from "react-toastify"; // Toast notifications

/**
 * CartItem component represents a single item in the shopping cart
 * - Shows product image, title, price, quantity controls, remove button, and details link
 * - Displays toast notifications for cart actions
 *
 * @param {Object} props
 * @param {Object} props.item - Cart item object containing product and quantity
 */
export default function CartItem({ item }) {
  const dispatch = useDispatch(); // Redux dispatch
  const { product, quantity } = item;

  /**
   * Remove product from cart
   */
  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
    toast.info(`${product.title} removed from cart`); // Notification
  };

  /**
   * Increase product quantity
   */
  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
    toast.success(`Increased quantity of ${product.title} to ${quantity + 1}`); // Notification
  };

  /**
   * Decrease product quantity (minimum 1)
   */
  const handleDecrement = () => {
    if (quantity === 1) return; // Prevent going below 1
    dispatch(decrementQuantity(product.id));
    toast.warn(`Decreased quantity of ${product.title} to ${quantity - 1}`); // Notification
  };

  return (
    <div className="cart-item">
      {/* Product Thumbnail */}
      <img src={product.thumbnail} alt={product.title} loading="lazy" />

      {/* Product Metadata: Title & Price */}
      <div className="meta">
        <h4>{product.title}</h4>
        <p>{formatCurrency(product.price)}</p>
      </div>

      {/* Quantity Controls and Actions */}
      <div className="controls">
        {/* Decrease Quantity */}
        <button onClick={handleDecrement}>−</button>

        {/* Current Quantity */}
        <span>{quantity}</span>

        {/* Increase Quantity */}
        <button onClick={handleIncrement}>+</button>

        {/* Remove Item from Cart */}
        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

/**
 * PropTypes ensures the cart item has correct shape
 */
CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.object.isRequired, // Product object required
    quantity: PropTypes.number.isRequired, // Quantity number required
  }).isRequired,
};
