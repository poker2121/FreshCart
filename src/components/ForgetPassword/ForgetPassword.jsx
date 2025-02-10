import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function sendResetCode(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      console.log(data);
      alert("Reset code has been sent to your email.");
      navigate("/verifyresetcode"); 
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: sendResetCode,
    validationSchema,
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Forgot Password
        </h2>

        {apiError && (
          <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-600 text-sm mb-2">Enter Your Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main transition"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>

          <button
            type="submit"
            className={`py-2 text-white font-semibold rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-main hover:bg-main-dark"
            }`}
            disabled={loading}
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Send Reset Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
