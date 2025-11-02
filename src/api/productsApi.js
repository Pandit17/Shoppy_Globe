/**
 * URL endpoint for fetching all products.
 * Using DummyJSON API for demo purposes.
 */
export const PRODUCTS_URL = "https://dummyjson.com/products";

/**
 * Fetches the list of products from the API.
 * 
 * @returns {Promise<Array>} - Returns an array of product objects.
 * @throws {Error} - Throws an error if the network request fails.
 */
export async function fetchProducts() {
  // Make a GET request to PRODUCTS_URL
  const res = await fetch(PRODUCTS_URL);

  // Check if response is OK (status 200-299)
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

  // Parse response body as JSON
  const json = await res.json();

  // Return the "products" array, defaulting to empty array if missing
  return json.products || [];
}

/**
 * Fetches a single product by its ID.
 * 
 * @param {number|string} id - The unique ID of the product to fetch.
 * @returns {Promise<Object>} - Returns a product object.
 * @throws {Error} - Throws an error if the network request fails.
 */
export async function fetchProductById(id) {
  // Make a GET request to fetch a specific product
  const res = await fetch(`${PRODUCTS_URL}/${id}`);

  // Check if response is OK
  if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);

  // Parse response body as JSON and return
  const json = await res.json();
  return json;
}
