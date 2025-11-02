import React, { Suspense } from "react";
import { createRoot } from "react-dom/client"; // React 18 root API
import { Provider } from "react-redux"; // Provides Redux store to the app
import { RouterProvider } from "react-router-dom"; // Provides routing context
import router from "./routes/router"; // App routes configuration
import store from "./store/store"; // Redux store
import "./styles/global.css"; // Global CSS styles
import LoadingFallback from "./components/LoadingFallback"; // Fallback component for lazy loading

/**
 * Entry point of the application
 * Sets up Redux store, routing, and suspense for lazy-loaded components
 */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Redux store provider */}
    <Provider store={store}>
      {/* Suspense wrapper for lazy-loaded routes/components */}
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} /> {/* Renders routes based on router config */}
      </Suspense>
    </Provider>
  </React.StrictMode>
);
