import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import About from './components/About/About';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import { UserContextProvider } from "./context/UserContext"; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import WishList from './components/WishList/WishList';
import { WishlistProvider } from './context/WishlistContext';
import Cash from './components/Cash/Cash';
import SubCategories from './components/SubCategories/SubCategories';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { Helmet } from 'react-helmet';


const routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
      { path: 'cash', element: <ProtectedRoute><Cash /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'verifyresetcode', element: <VerifyResetCode /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'subcategories/:categoryId', element: <ProtectedRoute><SubCategories /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const query = new QueryClient();

function App() {
  return (
    
      <QueryClientProvider client={query}>
       <CartContextProvider>
      <WishlistProvider>
       <UserContextProvider>
        <RouterProvider router={routers} />
        <ReactQueryDevtools/>
        <Helmet>
        <meta name="description" content="Product details page" />
        <title>Fresh Cart</title>
        </Helmet>

       <Toaster/>
       </UserContextProvider>
       </WishlistProvider>
       </CartContextProvider>
     </QueryClientProvider>
   
  );
}

export default App;
