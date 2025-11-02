import React from "react";
import { Outlet } from "react-router-dom"; // Placeholder for nested routes
import Header from "./components/Header"; // Site header component

/**
 * App component: Main layout for the application
 * Contains Header, main content area, and footer
 */
export default function App() {
  return (
    <div className="app-root">
      {/* Header displayed on all pages */}
      <Header />

      {/* Main content area where nested routes render */}
      <main className="container">
        <Outlet /> {/* Renders the matched child route component */}
      </main>

      {/* Footer displayed on all pages */}
      <footer className="footer">
        <p>ShoppyGlobe • Demo E-commerce </p>
      </footer>
    </div>
  );
}
