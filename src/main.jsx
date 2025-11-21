import React, { Suspense } from "react";
import { createRoot } from "react-dom/client"; // React 18+ root API
import { Provider } from "react-redux"; // Provides Redux store to the app
import { RouterProvider } from "react-router-dom"; // Handles routing based on router configuration
import router from "./routes/router"; // App routes configured with createHashRouter
import store from "./store/store"; // Redux store
import "./styles/global.css"; // Global CSS
import "react-toastify/dist/ReactToastify.css"; // Toast notifications CSS
import LoadingFallback from "./components/LoadingFallback"; // Fallback UI for lazy-loaded components

/**
 * Entry point of the React application.
 * - Wraps the app with Redux Provider
 * - Suspense handles lazy-loaded components with fallback UI
 * - RouterProvider manages navigation using hash-based routing (configured in router.jsx)
 */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provides Redux store to all nested components */}
    <Provider store={store}>
      
      {/* Suspense displays fallback UI while lazy-loaded components load */}
      <Suspense fallback={<LoadingFallback />}>
        
        {/* RouterProvider renders the app according to the route configuration */}
        <RouterProvider router={router} />

      </Suspense>
    </Provider>
  </React.StrictMode>
);
