import { useState } from "react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { usePlans } from "../features/plans/usePlans";
import { useDrills } from "../features/drills/useDrills";
import { useTags } from "../features/tags/useTags";
import ButtonTile from "../ui/ButtonTile";
import Spinner from "../ui/Spinner";
import CreateRandomPlanForm from "../features/plans/CreateRandomPlanForm";

function Plans() {
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const { isLoading, plans } = usePlans();
  const { drills } = useDrills();
  const { tags } = useTags();

  console.log(plans);
  return <>
    <h1>PLANS</h1>
    {isLoading && <Spinner />}

    <div>tabelka</div>
    <div className="flex gap-10 justify-around my-10">
      <ButtonTile onClick={() => setIsRandomModalOpen(true)}>
        <GiPerspectiveDiceSixFacesRandom className="size-10" />
        random
      </ButtonTile>
      <ButtonTile>
        <MdOutlineDashboardCustomize className="size-10" />
        custom
      </ButtonTile>
    </div>
    {isRandomModalOpen && <CreateRandomPlanForm drills={drills} tags={tags} onClose={() => setIsRandomModalOpen(false)}/>}
  </>;
}

export default Plans;
