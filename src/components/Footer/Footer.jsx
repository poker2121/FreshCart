import apple from "../../assets/images/apple.svg";
import google from "../../assets/images/google-play.svg";
import visa from "../../assets/images/visa.svg";
import mastercard from "../../assets/images/mastercard.svg";
import paypal from "../../assets/images/paypal.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-900 py-6 mt-10  ">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-2 text-center md:text-left md:w-2/3">
            <h2 className="text-xl font-bold">Get the FreshCart app</h2>
            <p className="text-gray-600">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </div>
          <div className="mt-2 md:mt-0 md:flex md:items-end gap-4">
            <img src={apple} alt="App Store" className="w-24" />
            <img src={google} alt="Google Play" className="w-24" />
          </div>
        </div>

        <div className="mt-2 flex justify-start items-center space-x-4">
          <input
            type="text"
            placeholder="Enter App Link"
            className="p-2 border border-gray-300 rounded-lg w-2/4"
          />
          <button className="bg-[--main-color] text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Share App Link
          </button>
        </div>

        {/* Payment Section */}
        <div className="flex items-center mt-3">
          <h3 className="text-lg font-semibold mr-4">Payment Partners</h3>
          <div className="flex space-x-2">
            <img src={visa} alt="Visa" className="w-12" />
            <img src={mastercard} alt="Mastercard" className="w-12" />
            <img src={paypal} alt="PayPal" className="w-12" />
          </div>
        </div>

      </div>
    </footer>
  );
}
