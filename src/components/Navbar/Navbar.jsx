import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { LogOut, ShoppingCart, Heart, Home, Grid, Package, Award, Menu, X } from 'lucide-react';

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
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md py-3">
      <nav className="flex items-center justify-between px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="p-1.5">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-2xl">🛒</span>
              <span className="font-bold text-xl text-gray-800">FreshCart</span>
            </div>
          </NavLink>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="size-6 text-gray-700" />
          </button>
        </div>

        {userToken && (
          <div className="hidden lg:flex gap-x-6">
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors ${isActive ? 'text-green-600' : ''}`
              }
            >
              <Home className="size-5" />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/categories" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors ${isActive ? 'text-green-600' : ''}`
              }
            >
              <Grid className="size-5" />
              <span>Categories</span>
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors ${isActive ? 'text-green-600' : ''}`
              }
            >
              <Package className="size-5" />
              <span>Products</span>
            </NavLink>
            <NavLink 
              to="/brands" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors ${isActive ? 'text-green-600' : ''}`
              }
            >
              <Award className="size-5" />
              <span>Brands</span>
            </NavLink>
          </div>
        )}

        <div className="hidden lg:flex items-center gap-x-6">
          {userToken ? (
            <>
              <NavLink to="/cart" className="relative group">
                <ShoppingCart className="size-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                {cart.numOfCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-xs text-white rounded-full">
                    {cart.numOfCartItems}
                  </span>
                )}
              </NavLink>

              <NavLink to="/wishlist" className="relative group">
                <Heart className="size-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-xs text-white rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>

              <button 
                onClick={logOut} 
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <LogOut className="size-5" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/register" 
                className="px-2 py-2 bg-gray-200 text-dark cursor-pointer  rounded-full transition-colors"
              >
                Register
              </NavLink>
              <NavLink 
                to="/login" 
                className="px-4 py-2 bg-gray-200 text-white cursor-pointer rounded-full transition-colors"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden fixed inset-0 z-50 bg-white`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="p-1.5">
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-2xl">🛒</span>
                <span className="font-bold text-xl text-gray-800">FreshCart</span>
              </div>
            </NavLink>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="size-6 text-gray-700" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            <NavLink to="/home" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Home className="size-5" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/cart" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="size-5" />
              <span>Cart</span>
              {cart.numOfCartItems > 0 && (
                <span className="mr-auto px-2 py-1 bg-red-500 text-xs text-white rounded-full">
                  {cart.numOfCartItems}
                </span>
              )}
            </NavLink>
            <NavLink to="/categories" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Grid className="size-5" />
              <span>Categories</span>
            </NavLink>
            <NavLink to="/products" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Package className="size-5" />
              <span>Products</span>
            </NavLink>
            <NavLink to="/brands" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Award className="size-5" />
              <span>Brands</span>
            </NavLink>
          </div>
          <div className="mt-6 space-y-4 border-t pt-4">
            {userToken ? (
              <button 
                onClick={logOut} 
                className="flex items-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="size-5" />
                <span>Log Out</span>
              </button>
            ) : (
              <>
                <NavLink to="/register" className="block w-full p-3 text-center bg-gray-200 text-dark cursor-pointer rounded-lg transition-colors">
                  Register
                </NavLink>
                <NavLink to="/login" className="block w-full p-3 text-center bg-gray-200 text-white cursor-pointer rounded-lg transition-colors">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}