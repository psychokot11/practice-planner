import { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { useDrills } from '../features/drills/useDrills'
import DrillsTable from '../features/drills/DrillsTable'
import Spinner from '../ui/Spinner'
import CreateDrillForm from '../features/drills/CreateDrillForm'
import ButtonIcon from '../ui/buttons/ButtonIcon'

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
                <div className="hidden sm:block">
                    <ButtonIcon onClick={handleOpenForm} text="Add drill">
                        <IoMdAddCircle className="size-9 text-blue-500 bg-white rounded-full shadow-lg" />
                    </ButtonIcon>
                </div>
            </div>
            <DrillsTable drills={drills} />
            <div className="fixed bottom-4 right-4 sm:hidden z-50">
                <ButtonIcon onClick={handleOpenForm}>
                    <IoMdAddCircle className="size-16 text-blue-500 bg-white rounded-full shadow-lg" />
                </ButtonIcon>
            </div>
            {isFormOpen && (
                <CreateDrillForm type="create" onClose={handleCancelCreate} />
            )}
        </>
    )
}

export default Drills
