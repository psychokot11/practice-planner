import { useState } from 'react'
import { useDrills } from '../features/drills/useDrills'
import DrillsTable from '../features/drills/DrillsTable'
import Spinner from '../ui/Spinner'
import CreateDrillForm from '../features/drills/CreateDrillForm'
import Button from '../ui/buttons/Button'

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
            <h1>Drills</h1>
            <DrillsTable drills={drills} />
            <Button
                onClick={handleOpenForm}
                type="button"
                subtype="normal"
                disabled={false}
                center
            >
                {' '}
                Create drill{' '}
            </Button>
            {isFormOpen && (
                <CreateDrillForm type="create" onClose={handleCancelCreate} />
            )}
        </>
    )
}

export default Drills
