import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // For accessing and updating Redux store
import { clearCart } from "../store/cartSlice"; // Redux action to clear cart after order
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import formatCurrency from "../utils/formatCurrency"; // Utility to format prices

/**
 * Checkout component: handles order placement and collects user details
 */
export default function Checkout() {
  // Get cart items from Redux store; default to empty object
  const itemsMap = useSelector((s) => s.cart.items || {});
  const items = Object.values(itemsMap); // Convert items object to array

  // Calculate total price of cart
  const totalAmount = items.reduce(
    (sum, it) => sum + (it.product.price || 0) * it.quantity,
    0
  );

  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Form state to store user inputs
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  // State to show if order is being placed
  const [placing, setPlacing] = useState(false);

  /**
   * Updates form state on input change
   */
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

    setPlacing(true); // Show loading state on button

    // Simulate order processing delay
    setTimeout(() => {
      alert("Order placed"); // Notify user
      dispatch(clearCart()); // Clear cart in Redux
      navigate("/", { replace: true }); // Redirect to home page
    }, 400);
  };

  // Show message if cart is empty
  if (!items.length) {
    return (
      <div className="center">
        <h3>Your cart is empty</h3>
        <p>Add items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        {/* Checkout form */}
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

          <button type="submit" className="btn-primary" disabled={placing}>
            {placing ? "Placing..." : "Place Order"} {/* Show loading state */}
          </button>
        </form>

        {/* Order summary */}
        <aside className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {items.map((it) => (
              <li key={it.product.id}>
                {it.product.title} × {it.quantity} — {formatCurrency(it.product.price * it.quantity)}
              </li>
            ))}
          </ul>
          <p><strong>Total: {formatCurrency(totalAmount)}</strong></p>
        </aside>
      </div>
    </div>
  );
}
