import React, { useState } from 'react';
import AdminCard from "../components/admincard";
import AdminStats from "../components/adminstats";
import AddProduct from "../components/adminaddproduct";

function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <div className="text-center p-4">
        <button
          className="text-white bg-purple-500 hover:bg-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
          type="button"
          onClick={openSidebar}
          aria-controls="drawer-navigation"
          aria-expanded={sidebarOpen}
        >
          Menu
        </button>
      </div>

      
      <div 
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-51 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
        style={{ transition: 'transform 0.3s ease-in-out' }}
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400 mb-4">Menu</h5>
        <button
          type="button"
          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          onClick={closeSidebar}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>

        
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => { setActiveView("dashboard"); closeSidebar(); }}
              className="flex w-full text-left cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-2">Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => { setActiveView("addProduct"); closeSidebar(); }}
              className="flex w-full text-left cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-2">Add Products</span>
            </button>
          </li>
          
        </ul>
      </div>

      
      <div className="mt-10">
        {activeView === "dashboard" && (
          <>
            <AdminCard />
            <AdminStats />
          </>
        )}
        {activeView === "addProduct" && <AddProduct />}
      </div>
    </div>
  );
}

export default AdminPanel;
