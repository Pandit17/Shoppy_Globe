import React from "react";
import { useLocation, Link } from "react-router-dom"; // useLocation to get current URL, Link for navigation

/**
 * NotFound component: displays a 404 page when a route does not exist
 */
export default function NotFound() {
  const loc = useLocation(); // Get information about the current location/path

  return (
    <div className="notfound">
      {/* Main heading */}
      <h2>404 — Page Not Found</h2>

      {/* Show the path that was not found */}
      <p>
        The requested path <code>{loc.pathname}</code> could not be found on this site.
      </p>

      {/* Link to return to the home page */}
      <Link to="/">Return Home</Link>
    </div>
  );
}
