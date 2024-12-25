import { FcHome, FcIdea, FcPlanner, FcFolder, FcSettings } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const navLinkClasses =
  "text-neutral-500 hover:text-neutral-600 font-semibold flex gap-3 items-center px-9 py-5 visited:bg-neutral-50 active:bg-neutral-50 hover:bg-neutral-50 text-xl";
const iconClasses = "w-8 h-8";

function MainNav() {
  return (
    <ul className="flex flex-col gap-2 mt-12">
      <li>
        <NavLink to="/dashboard" className={navLinkClasses}>
          <FcHome className={iconClasses} />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/plans" className={navLinkClasses}>
          <FcPlanner className={iconClasses} />
          <span>Plans</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/drills" className={navLinkClasses}>
          <FcIdea className={iconClasses} />
          <span>Drills</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/tags" className={navLinkClasses}>
          <FcFolder className={iconClasses} />
          <span>Tags</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" className={navLinkClasses}>
          <FcSettings className={iconClasses} />
          <span>Settings</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default MainNav;
