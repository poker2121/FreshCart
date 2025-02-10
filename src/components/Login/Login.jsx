import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  async function login(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "An error occurred during login"
      );
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
        "Password must be at least 8 characters and contain both letters and numbers"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema,
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-2 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Login to Your Account
        </h2>

        {apiError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <p className="text-sm text-red-700">{apiError}</p>
          </div>
        )}

        <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`appearance-none block w-full px-4 py-2 border ${
                formik.errors.email && formik.touched.email
                  ? "border-red-300"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none block w-full px-4 py-2 border ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-300"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center !bg-transparent hover:!bg-transparent p-1 rounded-md transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-main hover:bg-main/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
              }`}
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div>
          <Link
            to="/forgetpassword"
            className="text-main hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <div>
          <span className="text-gray-600">Dont have an account? </span>
          <Link
            to="/register"
            className="font-medium text-main hover:text-main/80"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
