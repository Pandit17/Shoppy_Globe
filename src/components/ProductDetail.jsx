import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Hook to get product ID from URL params
import { useDispatch } from "react-redux"; // Hook to dispatch Redux actions
import { addToCart } from "../store/cartSlice"; // Redux action to add product to cart
import { fetchProductById } from "../api/productsApi"; // API call to fetch a single product
import formatCurrency from "../utils/formatCurrency"; // Utility to format price as currency
import { toast } from "react-toastify"; // Toast notifications

/**
 * ProductDetail component: displays detailed information for a single product
 * - Fetches product by ID from API
 * - Shows loading/error states
 * - Allows adding product to cart
 */
export default function ProductDetail() {
  const { id } = useParams(); // Get product ID from route parameters
  const dispatch = useDispatch(); // For dispatching Redux actions

  // Local state
  const [product, setProduct] = useState(null); // Product data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(); // Error message if fetch fails

  /**
   * Fetch product details when component mounts or ID changes
   */
  useEffect(() => {
    let mounted = true; // To prevent state updates if component unmounts

    (async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchProductById(id); // Fetch product data
        if (mounted) setProduct(data); // Update state if component is still mounted
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load product"); // Set error
      } finally {
        if (mounted) setLoading(false); // Stop loading
      }
    })();

    // Cleanup to avoid state updates after unmount
    return () => (mounted = false);
  }, [id]);

  /**
   * Handle adding product to cart
   * Dispatches Redux action and shows toast notification
   */
  const handleAdd = () => {
    if (!product) return;

    // Prepare payload for Redux
    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
    };

    dispatch(addToCart(payload)); // Dispatch addToCart action
    toast.success(`${product.title} added to cart!`); // Show notification
  };

  // Render loading, error, or fallback UI
  if (loading) return <div className="center">Loading product...</div>;
  if (error) return <div className="center error">Error: {error}</div>;
  if (!product) return <div className="center">Product not found</div>;

  // Render product details
  return (
    <div className="detail">
      {/* Product image */}
      <img
        src={product.thumbnail || (product.images && product.images[0])}
        alt={product.title}
        loading="lazy"
      />

      {/* Product information */}
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="price">{formatCurrency(product.price)}</p>
        <p>{product.description}</p>
        <p>
          <strong>Brand:</strong> {product.brand} • <strong>Stock:</strong> {product.stock}
        </p>

        {/* Add to cart button */}
        <div className="actions">
          <button onClick={handleAdd}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
