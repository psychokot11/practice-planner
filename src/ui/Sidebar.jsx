import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="row-span-3 px-8 py-10 border-r border-neutral-100">
      <NavLink to="/"><Logo /></NavLink>
      <MainNav />
    </aside>
  );
}

export default Sidebar;
