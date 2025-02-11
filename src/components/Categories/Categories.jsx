import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br  py-6">
      <div className="mx-auto max-w-7xl px-3">
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
            Shop by Category
          </h1>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-[--main-color] md:text-5xl">
          Explore our categories
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => navigate(`/subcategories/${category._id}`)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Category Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <div className="mt-2 h-0.5 w-12 bg-white/70 transition-all duration-300 group-hover:w-full" />
              </div>

              {/* Hover Effect Card */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-900 transition-transform duration-300 group-hover:scale-110">
                  Explore {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;