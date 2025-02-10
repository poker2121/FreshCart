import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  async function getProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      setFilteredProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold my-6 text-center">Our Products</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full sm:w-96 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const productId = product._id || product.id;

              return (
                <div
                  key={productId}
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white cursor-pointer"
                  onClick={() => navigate(`/products/${productId}`)}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 font-medium">{product.price} EGP</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 col-span-4">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
