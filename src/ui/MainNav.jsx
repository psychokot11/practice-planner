import PropTypes from "prop-types";
import { FcHome, FcIdea, FcPlanner, FcFolder, FcSettings } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const navLinkClasses =
  "text-neutral-500 hover:text-neutral-600 font-semibold flex gap-3 items-center px-9 py-5 visited:bg-neutral-50 active:bg-neutral-50 hover:bg-neutral-50 text-xl";
const iconClasses = "w-8 h-8";

function MainNav({ onClick}) {
  return (
    <ul>
      <li>
        <NavLink to="/dashboard" className={navLinkClasses} onClick={onClick}>
          <FcHome className={iconClasses} />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/plans" className={navLinkClasses} onClick={onClick}>
          <FcPlanner className={iconClasses} />
          <span>Plans</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/drills" className={navLinkClasses} onClick={onClick}>
          <FcIdea className={iconClasses} />
          <span>Drills</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/tags" className={navLinkClasses} onClick={onClick}>
          <FcFolder className={iconClasses} />
          <span>Tags</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" className={navLinkClasses} onClick={onClick}>
          <FcSettings className={iconClasses} />
          <span>Settings</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default MainNav;

MainNav.propTypes = {
  onClick: PropTypes.func,
}