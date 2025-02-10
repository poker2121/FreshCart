import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyResetCode = () => {
  const [resetCode, setResetCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );

      if (data.status === "Success") {
        localStorage.setItem("resetCode", resetCode); 
        navigate("/resetpassword"); 
      }
    } catch (error) {
      setError("Invalid reset code. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Verify Reset Code</h2>
      <input
        type="text"
        placeholder="Enter Reset Code"
        className="border p-2 rounded-md"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleVerify}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyResetCode;
