import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <h2 className="text-4xl font-bold my-8 text-center">Brands</h2>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/brands/${brand._id}`} className="text-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-45 h-45 object-cover rounded-full mb-4"
                />
                <p className="text-lg font-semibold text-gray-800">{brand.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
