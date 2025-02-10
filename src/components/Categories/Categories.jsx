import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategories(data.data);
        console.log(data.data);
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold text-center mb-6">Categories</h1>

      {loading ? (
                <div className="flex justify-center items-center h-[80vh]">
                  <Loading />
                </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition duration-300 text-center cursor-pointer"
              onClick={() => navigate(`/subcategories/${category._id}`)} 
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-semibold mt-3">{category.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
