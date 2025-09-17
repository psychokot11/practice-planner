import { useState } from 'react'
import CreateDrillForm from './CreateDrillForm'
import { useDeleteDrill } from './useDeleteDrills'
import DeleteModal from '../../ui/DeleteModal'
import Table from '../../ui/Table'
import TableRow from '../../ui/TableRow'
import useSorting from '../../hooks/useSorting'

const columns = [
    { name: 'Drill name', sortable: true, sortKey: 'name' },
    { name: 'Players', sortable: true, sortKey: 'players' },
    { name: 'Description' },
    { name: 'Tags',},
    { name: 'Link' },
]

const properties = ['players', 'description', 'tags', 'link']

function DrillsTable({ drills }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedDrill, setSelectedDrill] = useState(null)
    const { isDeleting, deleteDrill } = useDeleteDrill()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { sortColumn, sortDirection, handleSort, sortedData: sortedDrills } = useSorting(drills)

    function handleOpenModal(drill) {
        setIsModalOpen(true)
        setSelectedDrill(drill)
    }

    function handleEditClick(drill) {
        setSelectedDrill(drill)
        setIsFormOpen(true)
    }

    function handleDeleteClick(drill) {
        deleteDrill(drill.id)
        setIsModalOpen(false)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table 
                columns={columns}
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
            >
                <TableRow
                    data={sortedDrills}
                    dataType="drills"
                    properties={properties}
                    handleEditClick={handleEditClick}
                    handleOpenModal={handleOpenModal}
                    isDeleting={isDeleting}
                />
            </Table>

            {isFormOpen && (
                <CreateDrillForm
                    drill={selectedDrill}
                    type="edit"
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            {isModalOpen && (
                <DeleteModal
                    item="drill"
                    onAccept={() => handleDeleteClick(selectedDrill)}
                    onCancel={() => setIsModalOpen(false)}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}

export default DrillsTable
