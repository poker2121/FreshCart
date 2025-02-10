import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    setLoading(true);
    try {
      const userToken = localStorage.getItem("userToken");

      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: userToken }, 
      });
      setWishlist(data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
    setLoading(false);
  }

  async function addToWishlist(productId) {
    try {
      console.log('Adding to wishlist:', { id: productId });
  
      const userToken = localStorage.getItem("userToken");
  
      await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        { headers: { token: userToken } }
      );
  
      // إعادة تحميل قائمة الرغبات بالكامل بعد الإضافة
      fetchWishlist();
  
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Error adding product to wishlist');
    }
  }
  
  async function removeFromWishlist(productId) {
    try {
      console.log('Removing from wishlist:', { productId });
  
      const userToken = localStorage.getItem("userToken");
  
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: userToken },
      });
  
      
      fetchWishlist();
  
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }
  
  

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
