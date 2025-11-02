import React, { useMemo } from "react";
import useFetchProducts from "../hooks/useFetchProducts"; // Custom hook to fetch products from API
import ProductItem from "./ProductItem"; // Component to display individual product
import { useSelector } from "react-redux"; // To get search query from Redux

/**
 * ProductList component: displays a list of products with search filtering
 */
export default function ProductList() {
  // Fetch products using custom hook
  const { products, loading, error } = useFetchProducts();

  // Get current search query from Redux
  const searchQuery = useSelector((s) => s.cart.searchQuery || "");

  /**
   * Filter products based on search query
   * useMemo is used to optimize performance by recalculating only when products or searchQuery change
   */
  const filtered = useMemo(() => {
    if (!searchQuery) return products; // Return all products if no search query
    const q = searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive search
    return products.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) || // Check title
        (p.description && p.description.toLowerCase().includes(q)) // Check description
    );
  }, [products, searchQuery]);

  // Show loading indicator while fetching products
  if (loading) return <div className="center">Loading products...</div>;

  // Show error message if fetching failed
  if (error) return <div className="center error">Error: {error}</div>;

  return (
    <section>
      {/* Header with total results */}
      <div className="products-header">
        <h2>Products</h2>
        <small>{filtered.length} results</small>
      </div>

      {/* Grid of product cards */}
      <div className="grid">
        {filtered.map((p) => (
          <ProductItem key={p.id} product={p} /> // Render individual product
        ))}
      </div>
    </section>
  );
}
