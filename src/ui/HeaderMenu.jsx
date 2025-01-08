import ButtonIcon from "./ButtonIcon";
import { FcExport, FcManager, FcNightLandscape } from "react-icons/fc";

const iconClasses = "w-6 h-6";

function HeaderMenu() {
  return (
    <ul className="flex gap-2 ml-4">
      <ButtonIcon disabled={true}>
        <FcManager className={iconClasses} />
      </ButtonIcon>
      <ButtonIcon  disabled={true}>
        <FcNightLandscape className={iconClasses} />
      </ButtonIcon>
      <ButtonIcon  disabled={true}>
        <FcExport className={iconClasses} />
      </ButtonIcon>
    </ul>
  );
}

export default HeaderMenu;
