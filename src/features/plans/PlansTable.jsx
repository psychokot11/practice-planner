import { useState } from 'react'
import { useDeletePlan } from './useDeletePlan'
import CreatePlanForm from './CreatePlanForm'
import DeleteModal from '../../ui/DeleteModal'
import PlanDetailsModal from './PlanDetailsModal'
import Table from '../../ui/Table'
import TableRow from '../../ui/TableRow'

const columns = [
    { name: 'Plan name' },
    { name: 'Tags' },
    { name: 'Min. players' },
    { name: 'Description' },
]

const properties = ['tags', 'minNumPlayers', 'description']

function PlansTable({ plans, sections }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const { isDeleting, deletePlan } = useDeletePlan()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

    function handleOpenModal(plan) {
        setIsModalOpen(true)
        setSelectedPlan(plan)
    }

    function handleEditClick(plan) {
        setSelectedPlan(plan)
        setIsFormOpen(true)
    }

    function handleDeleteClick(plan) {
        deletePlan(plan.id)
        setIsModalOpen(false)
    }

    function handleRowClick(plan) {
        setSelectedPlan(plan)
        setIsDetailsModalOpen(true)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table columns={columns}>
                <TableRow
                    data={plans}
                    dataType="plans"
                    properties={properties}
                    handleEditClick={handleEditClick}
                    handleOpenModal={handleOpenModal}
                    handleRowClick={handleRowClick}
                    isDeleting={isDeleting}
                    sections={sections}
                />
            </Table>

            {isFormOpen && (
                <CreatePlanForm
                    plan={selectedPlan}
                    type="edit"
                    onClose={() => setIsFormOpen(false)}
                    planSections={sections}
                />
            )}

            {isModalOpen && (
                <DeleteModal
                    item="plan"
                    onAccept={() => handleDeleteClick(selectedPlan)}
                    onCancel={() => setIsModalOpen(false)}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {isDetailsModalOpen && (
                <PlanDetailsModal
                    plan={selectedPlan}
                    sections={sections}
                    onClose={() => setIsDetailsModalOpen(false)}
                />
            )}
        </div>
    )
}

export default PlansTable
