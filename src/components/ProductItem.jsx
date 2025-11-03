import React from "react";
import PropTypes from "prop-types"; // For validating prop types
import { Link } from "react-router-dom"; // For navigation to product detail page
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { addToCart } from "../store/cartSlice"; // Redux action to add item to cart
import formatCurrency from "../utils/formatCurrency"; // Utility to format price numbers

/**
 * ProductItem component: displays a single product card
 * - Shows product image, title, and price
 * - Allows adding product to cart
 * - Provides link to product details page
 *
 * @param {Object} props
 * @param {Object} props.product - Product object containing id, title, price, thumbnail, images
 */
export default function ProductItem({ product }) {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  /**
   * Handles adding product to cart
   */
  const handleAdd = () => {
    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || (product.images && product.images[0]) || "", // Fallback image
    };

    dispatch(addToCart(payload)); // Dispatch Redux action to add product to cart
  };

  return (
    <article className="card">
      {/* Clicking the image navigates to product detail page */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail || (product.images && product.images[0])} // Use first image as fallback
          alt={product.title}
          loading="lazy" // Lazy-load image for performance
        />
      </Link>

      {/* Product info section */}
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">{formatCurrency(product.price)}</p> {/* Display formatted price */}

        {/* Action buttons: add to cart and view details */}
        <div className="actions">
          <button onClick={handleAdd}>Add to cart</button>
          <Link to={`/product/${product.id}`} className="detail-link">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

// PropTypes validation to ensure correct prop shape
ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};
