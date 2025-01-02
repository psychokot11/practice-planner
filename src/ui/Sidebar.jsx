import PropTypes from "prop-types";
import MainNav from "./MainNav";

function Sidebar({ isMenuOpen, onClick }) {
  const sidebarClasses = isMenuOpen ? "translate-x-0" : "-translate-x-full";
  return (
    <aside 
      id="logo-sidebar" 
      className={`${sidebarClasses} fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} 
      aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <MainNav onClick={onClick}/>
      </div>
    </aside>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
}