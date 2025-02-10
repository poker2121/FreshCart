import { useState, createContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({});

  async function addProductToCart(productId) {
    try {
      const userToken = localStorage.getItem("userToken");

      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers:{token : userToken} }
      );

      console.log(data);
      getProductsCart();
      toast.success(data.message, { duration: 2000 });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product to cart");
    }
  }
  async function deleteProductCart(productId) {
    try {
      const userToken = localStorage.getItem("userToken");

      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      
        { headers:{token : userToken} }
      );

      console.log(data);
      getProductsCart(data);
      toast.success(data.status, { duration: 2000 });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product to cart");
    }
  }

  async function updateProductCountToCart(productId, count) {
    try {
 
      if (count < 1) return;
  
      
      setCart((prevCart) => {
        const updatedProducts = prevCart.products.map((item) => {
          if (item.product.id === productId) {
            item.count = count; 
          }
          return item;
        });
  
        return {
          ...prevCart,
          products: updatedProducts,
          totalCartPrice: prevCart.totalCartPrice, 
        };
      });
  
  
      const userToken = localStorage.getItem("userToken");
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token: userToken } }
      );
  
      
      setCart((prevCart) => ({
        ...prevCart,
        totalCartPrice: data.data.totalCartPrice,
      }));
  
      toast.success("Cart updated successfully!", { duration: 1000 });
    } catch (error) {
      console.error("Error updating product count:", error);
      toast.error("Failed to update cart", { duration: 1000 });
    }
  }
  
  
async function getProductsCart() {
  try {
    const userToken = localStorage.getItem("userToken");

    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token: userToken } }
    );

    
    setCart({
      status: data.status,
      numOfCartItems: data.numOfCartItems,
      cartId: data.cartId,
      products: data.data.products,
      totalCartPrice: data.data.totalCartPrice,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}


  useEffect(() => {
    getProductsCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addProductToCart, updateProductCountToCart , deleteProductCart}}>
      {children}
    </CartContext.Provider>
  );
}
