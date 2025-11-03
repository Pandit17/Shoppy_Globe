import React, { Suspense } from "react";
import { createRoot } from "react-dom/client"; // React 18+ root API for rendering
import { Provider } from "react-redux"; // Wraps the app with Redux store
import { RouterProvider, HashRouter } from "react-router-dom"; // HashRouter for GitHub Pages, RouterProvider for app routes
import router from "./routes/router"; // App routes configuration
import store from "./store/store"; // Redux store
import "./styles/global.css"; // Global styles applied across the app
import LoadingFallback from "./components/LoadingFallback"; // Shown while lazy components load

/**
 * Entry point: renders the entire React application
 * - Provides Redux store to all components
 * - Suspense handles lazy-loaded components with a fallback
 * - HashRouter ensures proper routing on GitHub Pages
 */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provides Redux store to all nested components */}
    <Provider store={store}>
      
      {/* Suspense displays fallback UI while lazy-loaded components are being fetched */}
      <Suspense fallback={<LoadingFallback />}>
        
        {/* Wrap RouterProvider with HashRouter for GitHub Pages deployment */}
        <HashRouter>
          <RouterProvider router={router} />
        </HashRouter>

      </Suspense>
    </Provider>
  </React.StrictMode>
);
