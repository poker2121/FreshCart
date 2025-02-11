import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  let { cart, updateProductCountToCart, deleteProductCart } = useContext(CartContext);

  const clearEntireCart = () => {
    // Clear each product one by one using the existing deleteProductCart function
    cart.products.forEach((item) => {
      deleteProductCart(item.product.id);
    });
    toast.success("Cart cleared successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {cart.products && cart.products.length > 0 ? (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Rest of the table header and content remains the same */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-medium text-gray-700">Product</th>
                    <th className="px-6 py-4 text-center font-medium text-gray-700">Quantity</th>
                    <th className="px-6 py-4 text-center font-medium text-gray-700">Price</th>
                    <th className="px-6 py-4 text-center font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart.products.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.product.imageCover}
                            className="w-16 h-16 rounded-lg object-cover"
                            alt={item.product.title}
                          />
                          <span className="font-medium text-gray-900">{item.product.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() =>
                              item.count > 1
                                ? updateProductCountToCart(item.product.id, item.count - 1)
                                : deleteProductCart(item.product.id)
                            }
                            className="inline-flex items-center justify-center p-2 text-sm font-medium h-8 w-8 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              type="number"
                              value={item.count}
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                              readOnly
                            />
                          </div>
                          <button
                            onClick={() => updateProductCountToCart(item.product.id, item.count + 1)}
                            className="inline-flex items-center justify-center p-2 text-sm font-medium h-8 w-8 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-900">
                        ${(item.price * item.count).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteProductCart(item.product.id)}
                          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Total: ${cart.totalCartPrice.toFixed(2)}
                  </h3>
                  <button
                    onClick={clearEntireCart}
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                <Link to="/checkout">
                  <button className="w-full sm:w-auto px-6 py-3 text-white bg-[--main-color] rounded-lg hover:bg-blue-600 transition-colors">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="w-24 h-24 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Looks like you havent added any products to your cart yet.</p>
            <Link to="/products">
              <button className="px-6 py-3 text-white bg-[--main-color] rounded-lg hover:bg-blue-600 transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}