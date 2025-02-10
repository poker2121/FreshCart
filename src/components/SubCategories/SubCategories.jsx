import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SubCategories() {
  const { categoryId } = useParams(); 
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubCategories() {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        );
        setSubCategories(data.data);
        console.log(data.data);
        
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubCategories();
  }, [categoryId]); 

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">SubCategories</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : subCategories.length === 0 ? (
        <p className="text-center text-red-500">No SubCategories Found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subCategories.map((subCategory) => (
            <div
              key={subCategory._id}
              className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition duration-300 text-center"
            >
              <h2 className="text-xl font-semibold">{subCategory.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
