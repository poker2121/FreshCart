import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AllOrders() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    
    const savedOrder = localStorage.getItem("orderData");
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
    
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Order Successful
        </h1>
        
        <p className="text-lg text-center text-gray-700 mb-4">
          Thank you for your order! Your purchase was successful and is now being processed.
        </p>

       
        {orderData ? (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Details</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Full Name: <span className="font-medium text-gray-800">{orderData.fullName}</span></p>
              <p className="text-sm text-gray-600">Total: <span className="font-medium text-gray-800"> {orderData.total || 1650} EGP</span></p>
              <p className="text-sm text-gray-600">Shipping Address: <span className="font-medium text-gray-800">{orderData.details}, {orderData.city}</span></p>
              <p className="text-sm text-gray-600">Phone: <span className="font-medium text-gray-800">{orderData.phone}</span></p>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center">No order data found.</p>
        )}

        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">All Orders Done</h1>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")} 
              className="bg-[--main-color] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
