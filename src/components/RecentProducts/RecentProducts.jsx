import { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext.jsx";
import { WishlistContext } from "../../context/WishlistContext.jsx";
import useProducts from "../../Hooks/useProducts.jsx";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  let { data, isLoading } = useProducts();

  const isInWishlist = (productId) => {
    if (!wishlist) return false;
    return wishlist.some((item) => item?.id === productId);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap gap-5 justify-center">
            {data &&
              data.map((product) => (
                <div key={product.id} className="w-1/5 relative transition-transform transform hover:scale-105"> 
                  <div className="product p-4 rounded-md border shadow-lg bg-white flex flex-col items-center">
                
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="absolute top-3 right-3 text-2xl transition p-2 wishlist-btn"
                      style={{
                        borderColor: isInWishlist(product.id) ? "red" : "gray",
                        color: isInWishlist(product.id) ? "red" : "gray",
                      }}
                    >
                      <i className="fa-solid fa-heart"></i>
                    </button>
  
                    <Link to={`productdetails/${product.id}`} className="flex-grow w-full">
                      <img
                        src={product.imageCover}
                        className="w-full rounded-lg"
                        alt={product.title}
                      />
                      <h3 className="text-blue-950 text-sm bg-green-200 rounded-md px-1  text-center mt-2">
                        {product.category.name}
                      </h3>
                      <h3 className="text-lg font-semibold  mt-1 line-clamp-1">
                        {product.title}
                      </h3>
  
                      <div className="flex justify-between text-sm mt-2 w-full ">
                        <span className="text-green-800 ">{product.price} EGP</span>
                        <span>
                          <i className="fa fa-star text-yellow-500"></i> {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
  
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="w-full mt-4 py-2 bg-[--main-color] text-white rounded-md hover:bg-blue-600 transition text-lg font-semibold"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
  

}
