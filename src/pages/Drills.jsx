import { useState } from 'react'
import { useDrills } from '../features/drills/useDrills'
import DrillsTable from '../features/drills/DrillsTable'
import Spinner from '../ui/Spinner'
import CreateDrillForm from '../features/drills/CreateDrillForm'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import ButtonTile from '../ui/buttons/ButtonTile'

function Drills() {
    const { isLoading, drills } = useDrills()
    const [isFormOpen, setIsFormOpen] = useState(false)

    function handleOpenForm() {
        setIsFormOpen(true)
    }

    function handleCancelCreate() {
        setIsFormOpen(false)
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Drills</h1>
                <ButtonTile onClick={handleOpenForm}>
                    <MdOutlineDashboardCustomize className="size-10" />
                    add <br /> new drill
                </ButtonTile>
            </div>
            <DrillsTable drills={drills} />
            {isFormOpen && (
                <CreateDrillForm type="create" onClose={handleCancelCreate} />
            )}
        </>
    )
}

export default Drills
