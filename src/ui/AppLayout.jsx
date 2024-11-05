import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="h-lvh grid grid-cols-layout grid-rows-layout">
      <Sidebar />
      <Header />
      <main className="bg-neutral-50 p-16 overflow-scroll">
        <div className="max-w-main mx-auto flex gap-12 flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
