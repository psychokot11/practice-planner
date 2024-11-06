import ButtonIcon from "./ButtonIcon";
import { FcExport, FcManager, FcNightLandscape } from "react-icons/fc";

const iconClasses = "w-6 h-6";

function HeaderMenu() {
  return (
    <ul className="flex gap-2">
      <ButtonIcon>
        <FcManager className={iconClasses} />
      </ButtonIcon>
      <ButtonIcon>
        <FcNightLandscape className={iconClasses} />
      </ButtonIcon>
      <ButtonIcon>
        <FcExport className={iconClasses} />
      </ButtonIcon>
    </ul>
  );
}

export default HeaderMenu;
