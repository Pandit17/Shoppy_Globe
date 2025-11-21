import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // For client-side navigation
import { useSelector, useDispatch } from "react-redux"; // To access and update Redux store
import { setSearchQuery } from "../store/cartSlice"; // Redux action to update search query

/**
 * Header component: displays site branding, search input, navigation links
 * Includes responsive mobile menu for screens ≤ 760px
 */
export default function Header() {
  const itemsMap = useSelector((s) => s.cart.items || {}); // Cart items
  const totalCount = Object.values(itemsMap).reduce(
    (sum, it) => sum + (it.quantity || 0),
    0
  ); // Total cart quantity
  const searchQuery = useSelector((s) => s.cart.searchQuery || ""); // Search query from Redux

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 760);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      {/* Brand / Logo */}
      <div className="brand" onClick={() => navigate("/")}>
        <Link to="/" aria-label="ShoppyGlobe home" className="brand-link">
          Shoppy<span className="glow">Globe</span>
        </Link>
      </div>

      {/* Hamburger menu button: only on mobile */}
      {isMobile && (
        <button
          className="mobile-menu-button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      <div className="header-right">
        {/* Search Input */}
        <div className="search">
          <input
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search products..."
            aria-label="Search products"
          />
        </div>

        {/* Navigation Links */}
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({totalCount})
          </Link>
          <Link to="/checkout" onClick={() => setMenuOpen(false)}>
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
