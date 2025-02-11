import { useFormik } from "formik";
import axios from "axios";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import imgpay from "../../assets/images/using-credit-card.jpg";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const [loadingButton, setLoadingButton] = useState(null);
  const navigate = useNavigate();

  async function handleCheckout(paymentMethod, shippingAddress) {
    try {
      if (!cart.cartId) {
        toast.error("Cart ID is missing!");
        return;
      }

      setLoadingButton(paymentMethod);

      if (paymentMethod === "cash") {
        localStorage.setItem("orderData", JSON.stringify(shippingAddress));
        navigate("/cash");
        return;
      }

      let apiUrl = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`;

      let { data } = await axios.post(apiUrl, shippingAddress, {
        headers: { token: localStorage.getItem("userToken") },
      });

      localStorage.setItem("orderData", JSON.stringify(shippingAddress));

      toast.success("Redirecting to payment...");
      location.href = data.session.url;
    } catch (err) {
      console.error(err.response?.data?.message);
      toast.error("An error occurred during payment.");
    } finally {
      setLoadingButton(null);
    }
  }

  const formik = useFormik({
    initialValues: {
      fullName: "",
      city: "",
      details: "",
      phone: "",
    },
    onSubmit: (values) => {
      handleCheckout("cash", values);
    },
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row ">
        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-[--main-color]">
            Complete Your Order
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-gray-700">
                Enter Your Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            {/* City Input */}
            <div>
              <label htmlFor="city" className="block text-gray-700">
                Enter Your City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            {/* Details Input */}
            <div>
              <label htmlFor="details" className="block text-gray-700">
                Enter Your Details:
              </label>
              <input
                type="text"
                id="details"
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-gray-700">
                Enter Your Phone:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            {/* Payment Options */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => handleCheckout("online", formik.values)}
                className={`w-1/2 py-2 rounded-md mr-2 flex items-center justify-center gap-2 transition-all ${
                  !formik.isValid || !formik.dirty || loadingButton === "online"
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
                disabled={
                  !formik.isValid || !formik.dirty || loadingButton !== null
                }
              >
                {loadingButton === "online" ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-credit-card"></i> Pay Online
                  </>
                )}
              </button>

              <button
                type="submit"
                className={`w-1/2 py-2 rounded-md flex items-center justify-center gap-2 transition-all ${
                  !formik.isValid || !formik.dirty || loadingButton === "cash"
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-700 text-white"
                }`}
                disabled={
                  !formik.isValid || !formik.dirty || loadingButton !== null
                }
              >
                {loadingButton === "cash" ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-money-bill-wave"></i> Pay Cash
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 self-center">
          <div className="rounded-lg overflow-hidden h-[520px]">
            <img
              src={imgpay}
              alt="Payment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}