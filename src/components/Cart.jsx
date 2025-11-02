import React from "react";
import { useSelector } from "react-redux"; // To access Redux store state
import CartItem from "./CartItem"; // Component to render individual cart items
import { Link } from "react-router-dom"; // For client-side navigation
import formatCurrency from "../utils/formatCurrency"; // Utility to format prices

/**
 * Cart component: displays all items in the user's cart and a summary
 */
export default function Cart() {
  // Get the cart items from Redux store; default to empty object
  const itemsMap = useSelector((s) => s.cart.items || {});

  // Convert items object into an array for easier mapping
  const items = Object.values(itemsMap);

  // Calculate total amount of cart by multiplying price with quantity for each item
  const totalAmount = items.reduce(
    (sum, it) => sum + (it.product.price || 0) * it.quantity,
    0
  );

  // If cart is empty, show a message with a link to shopping page
  if (!items.length) {
    return (
      <div className="center">
        <h3>Your cart is empty</h3>
        <Link to="/">Go shopping</Link>
      </div>
    );
  }

  // If cart has items, render cart list and summary
  return (
    <div className="cart-page">
      {/* Cart items list */}
      <div className="cart-list-wrapper" style={{ flex: 2 }}>
        <h2>Your Cart</h2>
        <div className="cart-list">
          {items.map((it) => (
            // Render each cart item using CartItem component
            <CartItem key={it.product.id} item={it} />
          ))}
        </div>
      </div>

      {/* Cart summary / order summary */}
      <aside className="cart-summary">
        <h3>Order Summary</h3>
        {/* Display total formatted as currency */}
        <p>Total: <strong>{formatCurrency(totalAmount)}</strong></p>
        {/* Link to checkout page */}
        <Link to="/checkout" className="btn-primary">Proceed to Checkout</Link>
      </aside>
    </div>
  );
}
