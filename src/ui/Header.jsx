import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <header className="col-span-1 px-20 py-5 flex gap-10 place-content-end items-center border-b border-neutral-100 ">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
