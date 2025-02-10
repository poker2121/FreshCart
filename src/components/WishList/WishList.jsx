import { useContext } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function WishList() {
  let { wishlist, removeFromWishlist } = useContext(WishlistContext);
  let { addProductToCart } = useContext(CartContext);

  return (
    <div className="p-2">
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((item, index) => (
            <div 
              key={index} 
              className="bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col h-[320px] transition-all transform hover:shadow-lg"
            >
              <img 
                src={item.imageCover} 
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              
              <h3 className="text-md font-semibold mt-2 text-gray-800 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">${item.price}</p> 
              
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => removeFromWishlist(item.id)}  
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                >
                  Remove
                </button>

                <button
                  onClick={() => addProductToCart(item.id)}  
                  className="px-2 py-1 bg-[--main-color] text-white rounded-md hover:bg-blue-600 transition text-sm"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          <div>
            <h2 className="text-xl mb-4 font-semibold text-gray-800">Your Wish List is Empty!</h2>
            <p className="text-gray-600 mb-4">
              It looks like you dont have any products in your wishlist.
            </p>
            <Link to="/products">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition shadow-lg">
                Go to Products
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
