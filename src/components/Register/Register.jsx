import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    } catch (err) {
      setApiError(err.response?.data?.message || "An error occurred during registration");
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3).max(20),
    email: Yup.string().required("Email is required").email(),
    password: Yup.string()
      .required("Password is required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Password must be at least 8 characters and contain both letters and numbers"),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: register,
    validationSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-2 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today and explore our amazing products
          </p>
        </div>

        {apiError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <p className="text-sm text-red-700">{apiError}</p>
          </div>
        )}

        <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
          {[
            { name: "name", label: "Full Name", type: "text", icon: "user" },
            { name: "email", label: "Email Address", type: "email", icon: "envelope" },
            { name: "password", label: "Password", type: "password", icon: "lock" },
            { name: "rePassword", label: "Confirm Password", type: "password", icon: "lock" },
            { name: "phone", label: "Phone Number", type: "tel", icon: "phone" },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <i className={`fas fa-${field.icon} text-gray-400 bg-transparent`}></i>
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type={
                    field.name === "password"
                      ? showPassword ? "text" : "password"
                      : field.name === "rePassword"
                      ? showRePassword ? "text" : "password"
                      : field.type
                  }
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`appearance-none block w-full pl-10 pr-10 py-2 border ${
                    formik.errors[field.name] && formik.touched[field.name]
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {(field.name === "password" || field.name === "rePassword") && (
                  <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center !bg-transparent hover:!bg-transparent p-1 rounded-md transition"
                  onClick={() =>
                    field.name === "password"
                      ? setShowPassword(!showPassword)
                      : setShowRePassword(!showRePassword)
                  }
                >
                  {field.name === "password" ? (
                    showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )
                  ) : showRePassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                )}
              </div>
              {formik.errors[field.name] && formik.touched[field.name] && (
                <p className="mt-2 text-sm text-red-600">{formik.errors[field.name]}</p>
              )}
            </div>
          ))}

          <div >
            <button
              type="submit"
              disabled={loading}
              className={` flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-main hover:bg-main/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
              }`}
            >
              {loading ? (
                <span >
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <div>
          <span className="text-gray-600">Already have an account? </span>
          <a
            href="/login"
            className="font-medium text-main hover:text-main/80"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
