import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="h-lvh grid">
      <Header />
      <Sidebar />
      <main className="bg-neutral-50 mt-6 sm:mt-10 p-16 overflow-scroll sm:ml-64">
        <div className="max-w-main mx-auto flex gap-12 flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
