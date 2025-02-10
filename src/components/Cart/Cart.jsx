import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let { cart, updateProductCountToCart, deleteProductCart } =
    useContext(CartContext);

  return (
    <>
      {cart.products && cart.products.length > 0 ? (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 "
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4 text-center">
                    <img
                      src={item.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full object-cover rounded"
                      alt={item.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={
                          item.count > 1
                            ? () =>
                                updateProductCountToCart(
                                  item.product.id,
                                  item.count - 1
                                )
                            : () => deleteProductCart(item.product.id)
                        }
                        className="inline-flex items-center justify-center p-2 text-sm font-medium h-8 w-8 text-gray-500 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
                        type="button"
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
                        onClick={() =>
                          updateProductCountToCart(
                            item.product.id,
                            item.count + 1
                          )
                        }
                        className="inline-flex items-center justify-center p-2 text-sm font-medium h-8 w-8 text-gray-500 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
                        type="button"
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
                  <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                    ${item.price * item.count}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteProductCart(item.product.id)}
                      className="font-medium text-white bg-red-600 rounded-lg px-4 py-2 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center py-4 px-6 bg-gray-50 mt-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Total Cart Price: ${cart.totalCartPrice}
              </h3>
            </div>
            <Link to={`/checkout`}>
              <button className="px-6 py-3 text-white bg-[--main-color] rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-colors duration-300">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Cart is Empty!</h2>
            <p className="text-gray-600 mb-4">
              It looks like you dont have any products in your cart.
            </p>
            <Link to="/products">
              <button className="bg-[--main-color] text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Go to Products
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
