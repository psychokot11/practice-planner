import { FcHome, FcIdea, FcPlanner, FcFolder, FcSettings } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'

const navLinkClasses =
    'text-neutral-500 hover:text-neutral-600 font-semibold flex gap-3 items-center px-9 py-5 visited:bg-neutral-50 active:bg-neutral-50 hover:bg-neutral-50 text-xl'
const iconClasses = 'w-8 h-8'

function MainNav({ handleMenu }) {
    return (
        <ul>
            <li>
                <NavLink
                    to="/dashboard"
                    className={navLinkClasses}
                    onClick={handleMenu}
                >
                    <FcHome className={iconClasses} />
                    <span>Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/plans"
                    className={navLinkClasses}
                    onClick={handleMenu}
                >
                    <FcPlanner className={iconClasses} />
                    <span>Plans</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/drills"
                    className={navLinkClasses}
                    onClick={handleMenu}
                >
                    <FcIdea className={iconClasses} />
                    <span>Drills</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/tags"
                    className={navLinkClasses}
                    onClick={handleMenu}
                >
                    <FcFolder className={iconClasses} />
                    <span>Tags</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/settings"
                    className={`${navLinkClasses} opacity-50 cursor-not-allowed`}
                    onClick={(e) => {
                        e.preventDefault()
                        handleMenu()
                    }}
                >
                    <FcSettings className={iconClasses} />
                    <span>Settings</span>
                </NavLink>
            </li>
        </ul>
    )
}

export default MainNav
