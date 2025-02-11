import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext.jsx";
import { WishlistContext } from "../../context/WishlistContext.jsx";
import useProducts from "../../Hooks/useProducts.jsx";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  let { data, isLoading } = useProducts();

  const isInWishlist = (productId) => {
    if (!wishlist) return false;
    return wishlist.some((item) => item?.id === productId);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.map((product) => (
              <div key={product.id} className="group relative">
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                  >
                    <i className={`fa-${isInWishlist(product.id) ? 'solid' : 'regular'} fa-heart text-xl ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600'}`}></i>
                  </button>

                  {/* Product Link */}
                  <Link to={`productdetails/${product.id}`} className="block">
                    {/* Image Container */}
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.imageCover}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={product.title}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      {/* Category */}
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mb-2">
                        {product.category.name}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {product.title}
                      </h3>

                      {/* Price and Rating */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-green-700">
                          {product.price} EGP
                        </span>
                        <div className="flex items-center gap-1">
                          <i className="fa fa-star text-yellow-400"></i>
                          <span className="text-sm text-gray-600">
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addProductToCart(product.id);
                        }}
                        className="w-full py-2.5 px-4 bg-[--main-color] text-white rounded-lg font-semibold 
                                 transition-all duration-300 hover:bg-blue-600 
                                 active:transform active:scale-95 
                                 flex items-center justify-center gap-2"
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}