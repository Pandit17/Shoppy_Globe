import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get product ID from URL
import { useDispatch } from "react-redux"; // To dispatch actions to Redux
import { addToCart } from "../store/cartSlice"; // Redux action to add product to cart
import { fetchProductById } from "../api/productsApi"; // API call to fetch single product
import formatCurrency from "../utils/formatCurrency"; // Utility to format price

/**
 * ProductDetail component: shows detailed information of a single product
 * Allows adding the product to the cart
 */
export default function ProductDetail() {
  const { id } = useParams(); // Get the product ID from route params
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux

  // Local state to store product data, loading, and error states
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  /**
   * Fetch product details when component mounts or when ID changes
   */
  useEffect(() => {
    let mounted = true; // Prevent setting state if component unmounts
    (async () => {
      setLoading(true); // Show loading state
      try {
        const data = await fetchProductById(id); // Fetch product data
        if (mounted) setProduct(data); // Set product data if component is still mounted
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load product"); // Set error if fetch fails
      } finally {
        if (mounted) setLoading(false); // Stop loading indicator
      }
    })();

    // Cleanup function to avoid state updates after unmount
    return () => (mounted = false);
  }, [id]);

  /**
   * Handles adding product to cart
   */
  const handleAdd = () => {
    if (!product) return;

    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
    };

    dispatch(addToCart(payload)); // Dispatch addToCart action
  };

  // Show loading, error, or fallback UI
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

      {/* Product info */}
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="price">{formatCurrency(product.price)}</p> {/* Display price */}
        <p>{product.description}</p> {/* Product description */}
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
