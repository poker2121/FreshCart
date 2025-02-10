import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/freshcart-logo.svg';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let { wishlist } = useContext(WishlistContext);

  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gray-100 shadow-md py-3">
      <nav className="flex items-center justify-between px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="p-1.5">
            <img className="w-32" src={Logo} alt="FreshCart Logo" />
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="p-2.5 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 hover:text-gray-900"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {userToken && (
          <div className="hidden lg:flex gap-x-4">
            <NavLink to="/home" className="text-gray-900 hover:text-[--main-color]">Home</NavLink>
            <NavLink to="/categories" className="text-gray-900 hover:text-[--main-color]">Categories</NavLink>
            <NavLink to="/products" className="text-gray-900 hover:text-[--main-color]">Products</NavLink>
            <NavLink to="/brands" className="text-gray-900 hover:text-[--main-color]">Brands</NavLink>
          </div>
        )}
        <div className="hidden lg:flex items-center gap-x-4">
          {userToken ? (
            <>
              <NavLink to="/cart" className="relative">
                <i className="fas fa-shopping-cart text-xl text-gray-900 hover:text-[--main-color]"></i>
                <span className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-red-500 text-xs text-white rounded-full">
                {cart.numOfCartItems ?? 0}
                </span>

              </NavLink>

              <NavLink to="/wishlist" className="relative">
                <i className="far fa-heart text-xl text-gray-900 hover:text-[--main-color]"></i>
                {wishlist.length > 0 && (
                  <span className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-red-500 text-xs text-white rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>

              <span onClick={logOut} className="cursor-pointer text-gray-600 hover:text-gray-900">Logout</span>
            </>
          ) : (
            <>
              <NavLink to="/register" className="text-gray-600 hover:text-gray-900">Register</NavLink>
              <NavLink to="/login" className="text-gray-600 hover:text-gray-900">Login</NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden fixed inset-0 z-50 bg-white shadow-lg`}> 
        <div className="p-6">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="p-1.5">
              <img className="w-32" src={Logo} alt="FreshCart Logo" />
            </NavLink>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2.5 text-gray-700 hover:text-gray-900"
            >
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 space-y-4">
            <NavLink to="/home" className="block text-gray-900 hover:bg-gray-100 p-2 rounded-md">Home</NavLink>
            <NavLink to="/cart" className="block text-gray-900 hover:bg-gray-100 p-2 rounded-md">Cart</NavLink>
            <NavLink to="/categories" className="block text-gray-900 hover:bg-gray-100 p-2 rounded-md">Categories</NavLink>
            <NavLink to="/products" className="block text-gray-900 hover:bg-gray-100 p-2 rounded-md">Products</NavLink>
            <NavLink to="/brands" className="block text-gray-900 hover:bg-gray-100 p-2 rounded-md">Brands</NavLink>
          </div>
          <div className="mt-6 space-y-4 border-t pt-4">
            {userToken ? (
              <span onClick={logOut} className="block text-gray-900 hover:bg-gray-100 p-2 rounded-md cursor-pointer">Logout</span>
            ) : (
              <>
                <NavLink to="/register" className="block text-gray-900 hover:bg-gray-100 p-2 rounded-md">Register</NavLink>
                <NavLink to="/login" className="block text-gray-900 hover:bg-gray-100 p-2 rounded-md">Login</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
