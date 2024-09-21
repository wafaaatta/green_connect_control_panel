import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';






const AdminLayout: React.FC = () => {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scroll bg-gray-100">
            <div className=" mx-auto p-4 min-h-[calc(100vh-127px)]">
              <Outlet />
            </div>
            <Footer />
  
          </main>
          
          {/* <Footer /> */}
        </div>
      </div>
    );
  };
  
  export default AdminLayout;