import React from "react";
import { Outlet } from "react-router-dom"; // Renders child route components inside parent route
import Header from "./components/Header"; // Header component displayed on all pages
import { ToastContainer } from "react-toastify"; // Toast notifications

/**
 * App component: Main layout of the application
 * Acts as the wrapper for all pages including header, footer, and main content
 */
export default function App() {
  return (
    <div className="app-root">
      {/* Header is persistent across all pages */}
      <Header />

      {/* Main content container for page-specific content */}
      <main className="container">
        {/* Outlet renders the child component for the current route */}
        <Outlet />
      </main>

      {/* Footer displayed on all pages */}
      <footer className="footer">
        <p>ShoppyGlobe • Demo E-commerce</p>
      </footer>

      {/* Toast notifications container */}
      <ToastContainer
        position="top-right" // Top-right notifications
        autoClose={2000} // Auto close in 2 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark" 
      />
    </div>
  );
}
