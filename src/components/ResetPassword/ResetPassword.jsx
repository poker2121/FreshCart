import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../Loading/Loading";

export default function ResetPassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleResetPassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.newPassword
        }
      );
      
      if (data.token) {
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      setApiError(err.response?.data?.message || "An error occurred");
      console.log(err);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .matches(/^[A-Z]\w{5,10}$/, "Password must start with uppercase and be 6-11 characters")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto md:w-1/2 py-12 px-6 shadow-css rounded-lg mt-4">
          <h1 className="text-3xl md:text-4xl pb-2 font-semibold text-center text-green-500">
            Reset Password
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {apiError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {apiError}
              </div>
            )}

            {/* Email Input */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
            </div>

            {formik.errors.email && formik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {formik.errors.email}
              </div>
            )}

            {/* Password Input */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                type="password"
                name="newPassword"
                id="newPassword"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="newPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                New Password
              </label>
            </div>

            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {formik.errors.newPassword}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="text-white tr3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}