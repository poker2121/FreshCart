import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';

export default function Layout() {
  return (
    <div >
      <Navbar />
       <main className="min-h-[80vh] mt-8 py-12 px-2  max-w-screen-xl mx-auto">    
          <Offline >
           <div className='p-3 inset-0 fixed bg-slate-300/50 bg-opacity-10 backdrop-blur  z-50 flex items-center justify-center' >
            <p className="text-center bg-slate-300 rounded-md p-3 text-red-500 font-semibold text-xl">You are offline Check on internet !!</p>
           </div>
          </Offline>
        <Outlet />
       </main>
      <Footer />
    </div>
  );
}