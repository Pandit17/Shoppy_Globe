import React from "react";
import { useDispatch } from "react-redux"; // Hook to dispatch Redux actions
import { addToCart } from "../store/cartSlice"; // Redux action to add product to cart
import { Link } from "react-router-dom"; // Navigate to product details page
import formatCurrency from "../utils/formatCurrency"; // Utility to format price
import { toast } from "react-toastify"; // Toast notifications

/**
 * ProductItem component: displays a single product in the product grid
 * - Shows product image, title, and price
 * - Provides Details link and Add to Cart button
 * - Shows toast notification when added to cart
 */
export default function ProductItem({ product }) {
  const dispatch = useDispatch(); // Redux dispatch function

  /**
   * Handle adding product to cart
   * Dispatches Redux action and shows toast
   */
  const handleAddToCart = () => {
    if (!product?.id) return; // Safety check

    // Prepare payload for Redux
    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
    };

    dispatch(addToCart(payload)); // Add to cart
    toast.success(`${product.title} added to cart!`); // Show success notification
  };

  return (
    <div className="card">
      {/* Product image */}
      <img
        src={product.thumbnail || (product.images && product.images[0])}
        alt={product.title}
      />

      {/* Card body: title, price, actions */}
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">{formatCurrency(product.price)}</p>

        {/* Action buttons: Details link and Add to Cart */}
        <div className="actions">
          <Link to={`/product/${product.id}`} className="detail-link">
            Details
          </Link>
          <button onClick={handleAddToCart} className="add-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
