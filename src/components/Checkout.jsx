import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // To access and update Redux store
import { clearCart } from "../store/cartSlice"; // Redux action to clear cart
import { useNavigate, Link } from "react-router-dom"; // Navigation and linking
import formatCurrency from "../utils/formatCurrency"; // Utility to format price

/**
 * Checkout component: handles order placement and collects user details
 */
export default function Checkout() {
  // Get cart items from Redux store; default to empty object
  const itemsMap = useSelector((s) => s.cart.items || {});
  const items = Object.values(itemsMap); // Convert object to array

  // Calculate total price of all items
  const totalAmount = items.reduce(
    (sum, it) => sum + (it.product.price || 0) * it.quantity,
    0
  );

  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Form state for user input
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  // State to show loading when order is being placed
  const [placing, setPlacing] = useState(false);

  /**
   * Updates form state on input change
   */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /**
   * Handles order placement
   */
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      alert("Please fill all details.");
      return;
    }

    setPlacing(true); // Show loading state

    // Simulate order processing
    setTimeout(() => {
      alert("Order placed"); // Notify user
      dispatch(clearCart()); // Clear cart in Redux store
      navigate("/", { replace: true }); // Redirect to home page
    }, 400);
  };

  // ================================
  // Empty cart state
  // ================================
  if (!items.length) {
    return (
      <div className="centered-empty">
        <h2>Your checkout is empty</h2>
        <p>Add items to your cart before proceeding.</p>
        {/* Link to go back to shopping */}
        <Link to="/" className="btn-primary">
          Go Shopping
        </Link>
      </div>
    );
  }

  // ================================
  // Checkout form and summary
  // ================================
  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        {/* Checkout Form */}
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} />
          </label>

          <label>
            Email
            <input name="email" value={form.email} onChange={handleChange} />
          </label>

          <label>
            Address
            <textarea name="address" value={form.address} onChange={handleChange} />
          </label>

          {/* Place order button */}
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
                {it.product.title} × {it.quantity} — {formatCurrency(it.product.price * it.quantity)}
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
