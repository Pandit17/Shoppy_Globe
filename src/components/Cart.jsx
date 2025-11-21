import React from "react";
import { useSelector } from "react-redux"; // Access Redux store
import CartItem from "./CartItem"; // Individual cart item component
import { Link } from "react-router-dom"; // For Go Shopping and Proceed to Checkout navigation
import formatCurrency from "../utils/formatCurrency"; // Utility to format price

/**
 * Cart component: displays all items in the cart
 * - Shows empty state if cart is empty with Go Shopping button
 * - Includes Proceed to Checkout button if cart has items
 */
export default function Cart() {
  const items = useSelector((state) => state.cart.items); // Get all cart items
  const cartArray = Object.values(items); // Convert object to array

  // ================================
  // Empty cart state
  // ================================
  if (!cartArray.length)
    return (
      <div className="centered-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to see them here.</p>

        {/* Button to navigate back to shopping */}
        <Link to="/" className="btn-primary">
          Go Shopping
        </Link>
      </div>
    );

  // ================================
  // Cart page with items
  // ================================
  return (
    <div className="cart-page">
      <div className="cart-list">
        {cartArray.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      {/* Cart summary sidebar */}
      <div className="cart-summary">
        <h3>Summary</h3>
        <p>
          Total:{" "}
          {formatCurrency(
            cartArray.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            )
          )}
        </p>

        {/* Proceed to Checkout button */}
        <Link to="/checkout" className="btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
