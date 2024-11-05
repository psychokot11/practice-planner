import MainNav from "./Mainnav";

function Sidebar() {
  return (
    <aside className="row-span-3 px-8 py-10 border-r border-neutral-100">
      <img
        src="logo.png"
        alt="logo"
        className="max-w-full h-36 w-auto block mx-auto"
      />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
