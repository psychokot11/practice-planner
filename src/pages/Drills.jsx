import { useState } from "react";
import { useDrills } from "../features/drills/useDrills";
import { useTags } from "../features/tags/useTags";
import { useCreateDrill } from "../features/drills/useCreateDrill";
import DrillsTable from "../features/drills/DrillsTable";
import Spinner from "../ui/Spinner";
import CreateDrillForm from "../features/drills/CreateDrillForm";

const buttonClasses = "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";

function Drills() {
  const { isLoading, drills } = useDrills();
  const { createDrill, isCreating } = useCreateDrill();
  const { tags } = useTags();
  const [ isFormOpen, setIsFormOpen] = useState(false);

  function handleOpenForm() {
    setIsFormOpen(true);
  }

  function handleCancelCreate() {
    setIsFormOpen(false);
}

  if (isLoading) return <Spinner />;

  return (
    <>
      <h1>Drills</h1>
      <DrillsTable drills={drills} />
      <button onClick={handleOpenForm} className={buttonClasses}>Create drill</button>
      { isFormOpen && 
        <CreateDrillForm 
          item="drill"
          tags={tags}
          onClose={handleCancelCreate}
          onCreate={createDrill}
          isCreating={isCreating}/>}
    </>
  );
}

export default Drills;
