import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom"; // For client-side routing
import App from "../App"; // Main layout component
import NotFound from "../components/NotFound"; // 404 page component

// Lazy load components to improve initial load performance
// This ensures the main bundle is smaller and components are loaded only when needed
const ProductList = lazy(() => import("../components/ProductList")); // Home / product listing
const ProductDetail = lazy(() => import("../components/ProductDetail")); // Single product details
const Cart = lazy(() => import("../components/Cart")); // Shopping cart page
const Checkout = lazy(() => import("../components/Checkout")); // Checkout page

/**
 * Router configuration using createBrowserRouter
 * - Provides nested routes inside App layout
 * - errorElement renders NotFound component for unmatched routes
 * - basename ensures proper routing for GitHub Pages deployment
 */
const router = createBrowserRouter(
  [
    {
      path: "/", // Root path
      element: <App />, // Main layout wrapper for all child routes
      errorElement: <NotFound />, // Display professional 404 page with neon styling
      children: [
        { index: true, element: <ProductList /> }, // Default home route showing product list
        { path: "product/:id", element: <ProductDetail /> }, // Product details page for selected product
        { path: "cart", element: <Cart /> }, // Shopping cart page
        { path: "checkout", element: <Checkout /> }, // Checkout page
      ],
    },
  ],
  {
    // Base URL for deployment on GitHub Pages
    // Example: if repository is Pandit17/Shoppy_Globe, basename should be "/Shoppy_Globe"
    basename: "/Shoppy_Globe",
  }
);

export default router;
