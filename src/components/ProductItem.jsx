import React from "react";
import PropTypes from "prop-types"; // For validating props
import { Link } from "react-router-dom"; // For navigation to product detail page
import { useDispatch } from "react-redux"; // To dispatch actions to Redux
import { addToCart } from "../store/cartSlice"; // Redux action to add item to cart
import formatCurrency from "../utils/formatCurrency"; // Utility to format prices

/**
 * ProductItem component: displays a single product card
 * Allows adding to cart and linking to product details
 * 
 * @param {Object} props
 * @param {Object} props.product - Product object with id, title, price, thumbnail, images
 */
export default function ProductItem({ product }) {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  /**
   * Handles adding the product to cart
   */
  const handleAdd = () => {
    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
    };

    dispatch(addToCart(payload)); // Dispatch action to add item to cart in Redux
  };

  return (
    <article className="card">
      {/* Clicking the image navigates to product detail page */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail || (product.images && product.images[0])} // Fallback to first image
          alt={product.title}
          loading="lazy" // Lazy load for performance
        />
      </Link>

      {/* Product information */}
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">{formatCurrency(product.price)}</p> {/* Formatted price */}

        {/* Action buttons */}
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

// PropTypes validation ensures 'product' prop is passed correctly
ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};
