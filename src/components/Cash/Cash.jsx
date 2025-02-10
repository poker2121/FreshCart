import { useFormik } from "formik";
import axios from "axios";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaMoneyBillWave } from "react-icons/fa";

export default function Cash() {
  const [loading, setLoading] = useState(false);
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function handleCashPayment(values) {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("You are not logged in.");
        return;
      }

      
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/orders", 
        {
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
          },
        },
        { headers: { token } }
      );

      
      toast.success("Order placed successfully!", { duration: 1000 });

      
      clearCart();

      
      navigate("/"); 
    } catch (err) {
      console.error(err.response?.data?.message);
      toast.error("Failed to place order. Try again!");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      fullName: "",
      city: "",
      details: "",
      phone: "",
    },
    onSubmit: handleCashPayment,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-500" /> Pay with Cash
        </h2>
        <form onSubmit={formik.handleSubmit}>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address Details</label>
            <input
              type="text"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <FaMoneyBillWave /> Confirm Cash Order
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
