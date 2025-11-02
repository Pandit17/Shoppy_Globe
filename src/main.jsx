import React, { Suspense } from "react";
import { createRoot } from "react-dom/client"; // React 18+ root API for rendering
import { Provider } from "react-redux"; // Wraps the app with Redux store
import { RouterProvider } from "react-router-dom"; // Provides routing context for the app
import router from "./routes/router"; // App routes configuration
import store from "./store/store"; // Redux store
import "./styles/global.css"; // Global styles applied across the app
import LoadingFallback from "./components/LoadingFallback"; // Shown while lazy components load

/**
 * Entry point: renders the entire React application
 * Wraps the app with Redux provider, Suspense for lazy loading, and RouterProvider
 */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provides Redux store to all nested components */}
    <Provider store={store}>
      
      {/* Suspense displays fallback UI while lazy-loaded components are being fetched */}
      <Suspense fallback={<LoadingFallback />}>
        
        {/* RouterProvider renders the app according to the route configuration */}
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
