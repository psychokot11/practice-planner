import { useState } from "react";
import PropTypes from "prop-types";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import { useDeletePlan } from "./useDeletePlan";
import CreatePlanForm from "./CreatePlanForm";
import DeleteModal from "../../ui/DeleteModal";

function PlansTable({ plans }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const {isDeleting, deletePlan} = useDeletePlan();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(plan) {
      setIsModalOpen(true);
      setSelectedPlan(plan);
  }

  function handleEditClick(plan) {
    // setSelectedDrill(drill); 
    setIsFormOpen(true); 
    console.log(plan);
  }

  function handleDeleteClick(plan) {
    deletePlan(plan.id);
    setIsModalOpen(false); 
    console.log(plan);
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
        <thead className="text-xs text-neutral-700 uppercase bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-400">
          <tr>
            <th scope="col" className="px-6 py-3">Plan name</th>
            <th scope="col" className="px-6 py-3">Focus</th>
            <th scope="col" className="px-6 py-3">Min. number of players</th>
            <th scope="col" className="px-6 py-3">Plan</th>
            <th scope="col" className="px-6 py-3">Comments</th>
            <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr
              key={plan.id}
              className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
              >
                {plan.name}
              </th>
              <td className="px-6 py-4">{plan.focus}</td>
              <td className="px-6 py-4">{plan.minNumPlayers}</td>
              <td className="px-6 py-4">plan</td>
              <td className="px-6 py-4">{plan.comments}</td>
              <td className="flex justify-between px-6 py-4 text-right">
                <button
                  onClick={() => handleEditClick(plan)}
                  className="font-medium hover:cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-400"
                  disabled={false}
                >
                  <AiTwotoneEdit />
                </button>
                <button
                  onClick={() => handleOpenModal(plan)}
                  className="font-medium hover:cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-400"
                  disabled={isDeleting}
                >
                  <AiTwotoneDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <CreatePlanForm
          plan={selectedPlan}
          type="edit"
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {isModalOpen && (
        <DeleteModal
          item="drill"
          onAccept={() => handleDeleteClick(selectedPlan)}
          onCancel={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default PlansTable;

PlansTable.propTypes = {
  plans: PropTypes.array.isRequired,
};