import React, { useMemo } from "react";
import useFetchProducts from "../hooks/useFetchProducts"; // Custom hook to fetch products from API
import ProductItem from "./ProductItem"; // Component to render individual product card
import { useSelector } from "react-redux"; // To get search query from Redux

/**
 * ProductList component: displays a list of products
 * - Uses a custom hook to fetch products
 * - Filters products based on search query from Redux
 * - Displays loading and error states
 */
export default function ProductList() {
  // Fetch products from API using custom hook
  const { products, loading, error } = useFetchProducts();

  // Get current search query from Redux store
  const searchQuery = useSelector((s) => s.cart.searchQuery || "");

  /**
   * Filter products based on search query
   * - useMemo optimizes performance by recalculating only when products or searchQuery change
   */
  const filtered = useMemo(() => {
    if (!searchQuery) return products; // Return all products if search query is empty
    const q = searchQuery.toLowerCase(); // Convert query to lowercase for case-insensitive match
    return products.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) || // Match against title
        (p.description && p.description.toLowerCase().includes(q)) // Match against description
    );
  }, [products, searchQuery]);

  // Display loading indicator while fetching products
  if (loading) return <div className="center">Loading products...</div>;

  // Display error message if fetching failed
  if (error) return <div className="center error">Error: {error}</div>;

  return (
    <section>
      {/* Header with section title and total filtered results */}
      <div className="products-header">
        <h2>Products</h2>
        <small>{filtered.length} results</small>
      </div>

      {/* Grid of product cards */}
      <div className="grid">
        {filtered.map((p) => (
          // Render each product as a ProductItem component
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
