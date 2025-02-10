import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
    
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Order Successful
        </h1>
        
 

        <p className="text-lg text-center text-gray-700 mb-4">
          Thank you for your order! Your purchase was successful and is now being processed.
        </p>
        
      
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Details</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Order ID: <span className="font-medium text-gray-800">123456789</span></p>
            <p className="text-sm text-gray-600">Total: <span className="font-medium text-gray-800">EGP 599</span></p>
            <p className="text-sm text-gray-600">Shipping Address: <span className="font-medium text-gray-800">123 Main Street, Cairo</span></p>
          </div>
        </div>
        
        <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Done</h1>
      
     
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/")} 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Return to Home
        </button>
      </div>
    </div>
      </div>
    </div>
  );
}
