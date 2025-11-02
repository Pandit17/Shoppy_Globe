import React from "react";
import { useLocation, Link } from "react-router-dom";

/**
 * NotFound component: displays a professional 404 page
 * - Shows the current path that was not found
 * - Provides a link to return home
 */
export default function NotFound() {
  const loc = useLocation(); // Get current URL/path

  return (
    <div className="notfound">
      {/* Main heading */}
      <h2>404 — Page Not Found</h2>

      {/* Show the invalid path */}
      <p>
        The requested path <code>{loc.pathname}</code> could not be found on this site.
      </p>

      {/* Return home link */}
      <Link to="/">Return Home</Link>
    </div>
  );
}
