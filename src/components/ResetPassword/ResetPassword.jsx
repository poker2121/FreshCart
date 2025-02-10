import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function resetPassword(values) {
    try {
      setLoading(true);
      const resetCode = localStorage.getItem("resetCode"); 

      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        { ...values, resetCode } 
      );

      console.log(data);
      alert("Password Reset Successfully! Please log in with your new password.");
      navigate("/login"); 
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New password is required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Password must be at least 8 characters long and contain letters & numbers"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    onSubmit: resetPassword,
    validationSchema,
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Reset Your Password
        </h2>

        {apiError && <div className="text-red-500">{apiError}</div>}

        <form onSubmit={formik.handleSubmit}>
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            className="border p-2 rounded-md w-full"
          />
          <button type="submit" className="bg-main text-white py-2 px-4 rounded-md mt-4">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
