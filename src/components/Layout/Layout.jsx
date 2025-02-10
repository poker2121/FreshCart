import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div >
      <Navbar />
      <main className="min-h-[80vh] mt-8 py-12 px-2  max-w-screen-xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}