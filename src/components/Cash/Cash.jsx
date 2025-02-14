import { useFormik } from "formik";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaMoneyBillWave, FaShoppingCart, FaCheckCircle } from "react-icons/fa";

export default function Cash() {
  const [loading, setLoading] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, getProductsCart } = useContext(CartContext);
  const navigate = useNavigate();

  const savedOrderData = JSON.parse(localStorage.getItem("orderData")) || {
    fullName: "",
    city: "",
    details: "",
    phone: "",
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  async function fetchCartData() {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("You must be logged in");
        return;
      }

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token } }
      );

      if (data?.data?.products) {
        setCartItems(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }

  async function handleCashPayment(values) {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      
      if (!token || !cart.cartId) {
        toast.error("Session invalid. Please try again.");
        return;
      }

     
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        { shippingAddress: values },
        { headers: { token } }
      );

      if (data.status === "success") {
        
        const orderDetails = {
          ...values,
          total: totalPrice
        };
        localStorage.setItem("orderData", JSON.stringify(orderDetails));
        
        
        await axios.delete(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { headers: { token } }
        );

     
        setIsOrderComplete(true);
        toast.success("Order placed successfully!");
        
    
        await getProductsCart();

        
        setTimeout(() => {
          navigate("/allorders");
        }, 1500);
      }
    } catch (err) {
      console.error("Error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to place order. Try again!");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: savedOrderData,
    onSubmit: handleCashPayment,
  });

  if (isOrderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="max-w-lg w-full bg-yellow-50 p-6 rounded-lg shadow-lg text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Redirecting to order details...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-500" /> Order Summary
        </h2>

        {/* Order Summary Section */}
        <div className="mb-8">
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaShoppingCart /> Cart Items
            </h3>
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.product.imageCover} 
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.product.title}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">Total:</p>
                    <p className="text-2xl font-bold text-green-600">${totalPrice}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty</p>
            )}
          </div>

          {/* Shipping Details */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-medium">{savedOrderData.fullName}</p>
              </div>
              <div>
                <p className="text-gray-600">City:</p>
                <p className="font-medium">{savedOrderData.city}</p>
              </div>
              <div>
                <p className="text-gray-600">Address:</p>
                <p className="font-medium">{savedOrderData.details}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">{savedOrderData.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Order Button */}
        <form onSubmit={formik.handleSubmit}>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            disabled={loading || cartItems.length === 0}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing Order...</span>
              </div>
            ) : (
              <>
                <FaMoneyBillWave /> 
                {cartItems.length > 0 ? (
                  <span>Confirm & Pay Cash (${totalPrice})</span>
                ) : (
                  <span>Cart is Empty</span>
                )}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}