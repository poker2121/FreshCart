import { useContext } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Package } from 'lucide-react';

export default function WishList() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">قائمة المفضلة فارغة</h2>
          <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد</p>
          <Link to="/products">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Package className="mr-2 h-5 w-5" />
              تصفح المنتجات
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Featured List </h1>
          <span className="bg-blue-100 text-[--main-color] text-sm font-medium px-3 py-1 rounded-full">
            {wishlist.length} Products
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img 
                  src={item.imageCover} 
                  alt={item.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-lg font-bold text-[--main-color] mb-4">
                  ${item.price}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Remove
                  </button>
                  
                  <button
                    onClick={() => addProductToCart(item.id)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[--main-color] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}