import React from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation between pages
import { useSelector, useDispatch } from "react-redux"; // For accessing and updating Redux state
import { setSearchQuery } from "../store/cartSlice"; // Redux action to update search query

/**
 * Header component: displays the site branding, search input, and navigation links
 */
export default function Header() {
  // Get cart items from Redux store; default to empty object
  const itemsMap = useSelector((s) => s.cart.items || {});

  // Calculate total quantity of items in cart
  const totalCount = Object.values(itemsMap).reduce(
    (sum, it) => sum + (it.quantity || 0),
    0
  );

  // Get current search query from Redux store
  const searchQuery = useSelector((s) => s.cart.searchQuery || "");

  const dispatch = useDispatch(); // Hook to dispatch actions to Redux
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <header className="header">
      {/* Brand / logo section */}
      <div className="brand" onClick={() => navigate("/")}>
        <Link to="/" aria-label="ShoppyGlobe home" className="brand-link">
          Shoppy<span className="glow">Globe</span>
        </Link>
      </div>

      <div className="header-right">
        {/* Search input */}
        <div className="search">
          <input
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))} // Update search query in Redux
            placeholder="Search products..."
            aria-label="Search products"
          />
        </div>

        {/* Navigation links */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({totalCount})</Link> {/* Shows total items in cart */}
          <Link to="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
