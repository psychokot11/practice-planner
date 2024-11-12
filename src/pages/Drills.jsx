import { useDrills } from "../features/drills/useDrills";
import DrillsTable from "../ui/DrillsTable";
import Spinner from "../ui/Spinner";

function Drills() {
  const { isLoading, drills } = useDrills();

  isLoading && <Spinner />;

  return (
    <>
      <h1>Drills</h1>
      <DrillsTable drills={drills} />
    </>
  );
}

export default Drills;
