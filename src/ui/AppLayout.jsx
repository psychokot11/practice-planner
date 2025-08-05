import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="grid">
      <Header handleMenu={() => setIsMenuOpen(!isMenuOpen)}/>
      <Sidebar isMenuOpen={isMenuOpen} handleMenu={() => setIsMenuOpen(!isMenuOpen)}/>
      <main
        onClick={() => isMenuOpen && setIsMenuOpen(false)} 
        className="bg-neutral-50 mt-6 sm:mt-10 py-16 px-4 md:py-16 md:px-4 lg:p-16 lg:ml-64 h-screen overflow-x-auto">
        <div className="max-w-main mx-auto flex gap-12 flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
