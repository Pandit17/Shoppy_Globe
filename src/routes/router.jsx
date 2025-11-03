import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom"; // For client-side routing
import App from "../App"; // Main layout component
import NotFound from "../components/NotFound"; // 404 page component

// Lazy-loaded components for performance optimization
const ProductList = lazy(() => import("../components/ProductList"));
const ProductDetail = lazy(() => import("../components/ProductDetail"));
const Cart = lazy(() => import("../components/Cart"));
const Checkout = lazy(() => import("../components/Checkout"));

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
      element: <App />, // Main layout wrapper
      errorElement: <NotFound />, // Display 404 page for unmatched routes
      children: [
        { index: true, element: <ProductList /> }, // Home / product listing
        { path: "product/:id", element: <ProductDetail /> }, // Product details page
        { path: "cart", element: <Cart /> }, // Shopping cart page
        { path: "checkout", element: <Checkout /> }, // Checkout page
      ],
    },
  ],
  {
    basename: "/Shoppy_Globe", // Required for GitHub Pages routing
  }
);

export default router;
