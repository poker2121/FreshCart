import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState('all');
  
  const navigate = useNavigate();

  async function getProducts() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen   p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-[--main-color] md:text-5xl">
            Our Collection
          </h1>
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full bg-white px-6 py-4 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => navigate(`/productdetails/${product._id}`)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {product.price} EGP
                  </span>
                  <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                    {product.category?.name || 'General'}
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-full items-center justify-center">
                  <span className="rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-900">
                    View Details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-medium text-gray-600">
              No products found matching your search.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;