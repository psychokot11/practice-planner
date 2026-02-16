import { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { useDrills } from '../features/drills/useDrills.ts'
import { useFilterByTags } from '../hooks/useFilterByTags'
import DrillsTable from '../features/drills/DrillsTable'
import Spinner from '../ui/Spinner'
import CreateDrillForm from '../features/drills/CreateDrillForm'
import ButtonIcon from '../ui/buttons/ButtonIcon'
import TagFilter from '../ui/TagFilter'

function Drills() {
    const { isLoading, drills } = useDrills()
    const [isFormOpen, setIsFormOpen] = useState(false)

    const {
        selectedTags,
        allTags,
        filteredItems: filteredDrills,
        incompatibleTags,
        handleTagToggle,
        clearFilters,
        hasActiveFilters,
    } = useFilterByTags(drills)

    function handleOpenForm() {
        setIsFormOpen(true)
    }

    function handleCancelCreate() {
        setIsFormOpen(false)
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <h1 className="flex items-center">Drills</h1>
                    <TagFilter
                        allTags={allTags}
                        selectedTags={selectedTags}
                        incompatibleTags={incompatibleTags}
                        onTagToggle={handleTagToggle}
                        onClearFilters={clearFilters}
                        hasActiveFilters={hasActiveFilters}
                        itemType="drills"
                    />
                </div>
                <div className="hidden sm:block">
                    <ButtonIcon onClick={handleOpenForm} text="Add drill" pulse>
                        <IoMdAddCircle className="size-9 text-blue-500 bg-white rounded-full shadow-lg" />
                    </ButtonIcon>
                </div>
            </div>
            <div>
                <DrillsTable drills={filteredDrills} />
            </div>
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
