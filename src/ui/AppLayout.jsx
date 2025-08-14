import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="pt-[64px] lg:pt-[72px] pb-16">
      <Sidebar isMenuOpen={isMenuOpen} handleMenu={() => setIsMenuOpen(!isMenuOpen)}/>
      <div className="grid">
        <Header handleMenu={() => setIsMenuOpen(!isMenuOpen)}/> 
        <main
          onClick={() => isMenuOpen && setIsMenuOpen(false)} 
          className="bg-neutral-50 py-16 px-4 md:py-16 md:px-4 lg:p-16 lg:ml-64 h-screen overflow-x-auto">
          
            <Outlet />
          
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
