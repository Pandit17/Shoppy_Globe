import React, { lazy } from "react";
import { createHashRouter } from "react-router-dom"; // Use HashRouter for GitHub Pages compatibility
import App from "../App"; // Main layout component
import NotFound from "../components/NotFound"; // 404 page component

// Lazy load components to improve performance and reduce initial bundle size
const ProductList = lazy(() => import("../components/ProductList")); // Home / product listing
const ProductDetail = lazy(() => import("../components/ProductDetail")); // Single product details
const Cart = lazy(() => import("../components/Cart")); // Shopping cart page
const Checkout = lazy(() => import("../components/Checkout")); // Checkout page

/**
 * Router configuration using createHashRouter
 * - Required for GitHub Pages since it doesn’t support BrowserRouter paths
 * - Provides nested routes within the main App layout
 * - Displays NotFound component for any invalid route
 */
const router = createHashRouter([
  {
    path: "/", // Root route
    element: <App />, // Main layout wrapper
    errorElement: <NotFound />, // Fallback 404 page for invalid routes
    children: [
      { index: true, element: <ProductList /> }, // Default route (home)
      { path: "product/:id", element: <ProductDetail /> }, // Product details page
      { path: "cart", element: <Cart /> }, // Shopping cart page
      { path: "checkout", element: <Checkout /> }, // Checkout page
    ],
  },
]);

export default router; // Export router for use in main.jsx

