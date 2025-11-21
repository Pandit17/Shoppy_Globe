import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Access Redux store & dispatch actions
import { clearCart } from "../store/cartSlice"; // Action to clear cart after order
import { Link, useNavigate } from "react-router-dom"; // Navigate to products page
import formatCurrency from "../utils/formatCurrency"; // Utility to format prices
import { toast } from "react-toastify"; // Toast notifications

/**
 * Checkout component: handles order placement and collects user details
 * - Shows empty cart state with "Go Shopping" button
 * - Displays checkout form and order summary
 * - Fires themed toast notification on order placement
 */
export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirecting after checkout

  // ================================
  // Get cart items from Redux store
  // ================================
  const itemsMap = useSelector((state) => state.cart.items || {});
  const items = Object.values(itemsMap); // Convert object to array

  // ================================
  // Total order amount
  // ================================
  const totalAmount = items.reduce(
    (sum, it) => sum + (it.product.price || 0) * it.quantity,
    0
  );

  // ================================
  // Form state
  // ================================
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  // State to show loading when placing order
  const [placing, setPlacing] = useState(false);

  // ================================
  // Handle input changes
  // ================================
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ================================
  // Handle placing the order
  // ================================
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Validation: all fields required
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      toast.error("Please fill all details!", { theme: "dark" });
      return;
    }

    setPlacing(true);

    // Simulate async order placement
    setTimeout(() => {
      // Themed toast notification for successful order
      toast.success("Order placed successfully!", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false, // toast won't pause on hover
        draggable: true,
        theme: "dark",
        style: {
          background: "rgba(15,23,32,0.95)",
          color: "#e6eef7",
          boxShadow: "0 0 12px rgba(124,92,255,0.4)",
          borderLeft: "4px solid #7c5cff",
          borderRadius: "8px",
          padding: "12px 16px",
          minWidth: "280px",
        },
      });

      // Wait for toast to disappear before clearing cart & redirecting
      setTimeout(() => {
        dispatch(clearCart()); // Clear cart
        setForm({ name: "", email: "", address: "" }); // Reset form
        setPlacing(false); // Stop loading
        navigate("/", { replace: true }); // Redirect to home page
      }, 2100); // slightly longer than autoClose
    }, 400);
  };

  // ================================
  // Empty cart state
  // ================================
  if (!items.length) {
    return (
      <div className="centered-empty">
        <h2>Your cart is empty</h2>
        <p>Add items to proceed to checkout.</p>

        {/* Button to navigate back to shopping */}
        <Link to="/" className="btn-primary">
          Go Shopping
        </Link>
      </div>
    );
  }

  // ================================
  // Checkout form and order summary
  // ================================
  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        {/* Checkout Form */}
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Address
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping address"
            />
          </label>

          {/* Place Order Button */}
          <button type="submit" className="btn-primary" disabled={placing}>
            {placing ? "Placing..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {items.map((it) => (
              <li key={it.product.id}>
                {it.product.title} × {it.quantity} —{" "}
                {formatCurrency(it.product.price * it.quantity)}
              </li>
            ))}
          </ul>

          {/* Total amount */}
          <p>
            <strong>Total: {formatCurrency(totalAmount)}</strong>
          </p>
        </aside>
      </div>
    </div>
  );
}
