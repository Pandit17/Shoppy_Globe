import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom"; // For client-side routing
import App from "../App"; // Main app component
import NotFound from "../components/NotFound"; // 404 page

// Lazy load components to improve initial load performance
const ProductList = lazy(() => import("../components/ProductList"));
const ProductDetail = lazy(() => import("../components/ProductDetail"));
const Cart = lazy(() => import("../components/Cart"));
const Checkout = lazy(() => import("../components/Checkout"));

/**
 * Router configuration using createBrowserRouter
 * Includes lazy-loaded components and nested routes
 */
const router = createBrowserRouter(
  [
    {
      path: "/", // Root path
      element: <App />, // Main layout component
      errorElement: <NotFound />, // Shown if route is not found
      children: [
        { index: true, element: <ProductList /> }, // Default route (home)
        { path: "product/:id", element: <ProductDetail /> }, // Product detail route
        { path: "cart", element: <Cart /> }, // Cart page
        { path: "checkout", element: <Checkout /> }, // Checkout page
      ],
    },
  ],
  {
    // Base URL for deployment (e.g., GitHub Pages)
    basename: "/Shoppy_Globe",
  }
);

export default router;
