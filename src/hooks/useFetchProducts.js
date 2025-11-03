import { useState, useEffect } from "react";
import { fetchProducts } from "../api/productsApi"; // API function to fetch products

/**
 * Custom hook: useFetchProducts
 * Fetches product list from API and manages loading and error states
 *
 * @returns {Object} { products, loading, error }
 *   - products: array of fetched products
 *   - loading: boolean indicating if data is being fetched
 *   - error: any error message from fetching
 */
export default function useFetchProducts() {
  // State to store fetched products
  const [products, setProducts] = useState([]);

  // State to indicate loading status
  const [loading, setLoading] = useState(true);

  // State to store any error encountered
  const [error, setError] = useState(null);

  /**
   * Fetch products on component mount
   * Uses an immediately invoked async function inside useEffect
   * Cleanup with `mounted` flag to prevent state updates after unmount
   */
  useEffect(() => {
    let mounted = true; // To avoid setting state if component unmounts

    (async () => {
      setLoading(true); // Start loading indicator
      try {
        const data = await fetchProducts(); // Fetch products from API
        if (mounted) setProducts(data); // Update products state if still mounted
      } catch (err) {
        if (mounted) setError(err.message || "Unknown error"); // Capture error
      } finally {
        if (mounted) setLoading(false); // Stop loading indicator
      }
    })();

    // Cleanup function to avoid memory leaks if component unmounts
    return () => {
      mounted = false;
    };
  }, []);

  // Return the products, loading, and error states to be used in components
  return { products, loading, error };
}
