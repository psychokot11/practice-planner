import Logo from "./Logo";
import MainNav from "./Mainnav";

function Sidebar() {
  return (
    <aside className="row-span-3 px-8 py-10 border-r border-neutral-100">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
