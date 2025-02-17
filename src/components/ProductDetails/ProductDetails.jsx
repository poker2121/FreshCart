import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { addProductToCart } = useContext(CartContext);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplayspeed: 2000,
  };

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  async function getProduct(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    setProduct(data.data);
    setLoading(false);
    getRelatedProducts(data.data.category._id);
  }

  async function getRelatedProducts(categoryId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
    );
    setRelatedProducts(data.data); 
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <>
     <h2 className="text-4xl font-bold my-6">Details</h2>
     <Helmet>
   <meta name="description" content="Product details page" />
  <title>{product ? product.title : "Loading..."}</title>
</Helmet>
   
{loading ? (
  <Loading />
) : (
  <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
   
    <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
      <Slider {...settings}>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={product.title}
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
        ))}
      </Slider>
    </div>

   
    <div className="w-full lg:w-2/3 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-gray-500">
        <strong>Category: </strong>
        {product.category.name}
      </p>

      <div className="flex items-center gap-6 mb-6">
        <span className="text-2xl font-semibold text-gray-800">
          {product.price} EGP
        </span>
        <div className="flex items-center text-yellow-500">
          <i className="fa fa-star mr-2"></i>
          {product.ratingsAverage}
        </div>
      </div>

      
      <button
        onClick={() => addProductToCart(product.id)}
        className="btn px-8 py-3 bg-[--main-color] text-white rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
      >
        Add to cart
      </button>
    </div>
  </div>
)}


<div className="my-12 border-t border-gray-300"></div>


{relatedProducts.length > 0 && (
  <div className="related-products mt-8">
    <h2 className="text-3xl font-bold my-4">Related Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {relatedProducts.map((relatedProduct) => (
        <div
          key={relatedProduct.id}
          className="product-card border shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow bg-white"
        >
          <img
            src={relatedProduct.imageCover}
            alt={relatedProduct.title}
            className="w-full h-56 object-cover rounded-lg"
          />
          <div className="px-3 py-1">
            <h4 className="text-xl font-semibold line-clamp-1">
              {relatedProduct.title}
            </h4>
            <p className="text-gray-600 my-2">{relatedProduct.price} EGP</p>
            <button
              onClick={() => addProductToCart(relatedProduct.id)}
              className="btn mt-2 w-full bg-[--main-color] text-white rounded-lg hover:bg-blue-700 transition-all"
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
