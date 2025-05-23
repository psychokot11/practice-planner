import { useState } from 'react'
import CreateDrillForm from './CreateDrillForm'
import { useDeleteDrill } from './useDeleteDrills'
import DeleteModal from '../../ui/DeleteModal'
import Table from '../../ui/Table'
import TableRow from '../../ui/TableRow'

const columns = [
    { name: 'Drill name' },
    { name: 'Min. players' },
    { name: 'Description' },
    { name: 'Tags' },
    { name: 'Link' },
]

const properties = ['minNumPlayers', 'description', 'tags', 'link']

function DrillsTable({ drills }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedDrill, setSelectedDrill] = useState(null)
    const { isDeleting, deleteDrill } = useDeleteDrill()
    const [isModalOpen, setIsModalOpen] = useState(false)

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
            <Table columns={columns}>
                <TableRow
                    data={drills}
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
