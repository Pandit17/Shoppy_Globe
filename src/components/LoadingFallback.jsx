import React from "react";

/**
 * LoadingFallback component: simple fallback UI to display while content is loading
 * Typically used with Suspense or async data fetching
 */
export default function LoadingFallback() {
  return (
    <div className="center">
      {/* Centered loading message */}
      Loading...
    </div>
  );
}
