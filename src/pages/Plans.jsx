import { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { usePlans } from '../features/plans/usePlans'
import { useSettings } from '../features/settings/useSettings'
import { useFilterByTags } from '../hooks/useFilterByTags'
import ButtonIcon from '../ui/buttons/ButtonIcon'
import Spinner from '../ui/Spinner'
import CreatePlanForm from '../features/plans/CreatePlanForm'
import PlansTable from '../features/plans/PlansTable'
import TagFilter from '../ui/TagFilter'

function Plans() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isLoading, plans } = usePlans()
    const { isLoading: isLoadingSettings, settings } = useSettings()
    
    const {
        selectedTags,
        allTags,
        filteredItems: filteredPlans,
        incompatibleTags,
        handleTagToggle,
        clearFilters,
        hasActiveFilters
    } = useFilterByTags(plans)

    const sections = settings ? settings[0].stages : []

    const isDataReady =
        !isLoading && !isLoadingSettings

    if (!isDataReady) return <Spinner />

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <h1 className="flex items-center">Plans</h1>
                    <TagFilter
                        allTags={allTags}
                        selectedTags={selectedTags}
                        incompatibleTags={incompatibleTags}
                        onTagToggle={handleTagToggle}
                        onClearFilters={clearFilters}
                        hasActiveFilters={hasActiveFilters}
                        itemType="plans"
                    />
                </div>
                <div className="hidden sm:block">
                    <ButtonIcon onClick={() => setIsModalOpen(true)} text="Add plan" pulse>
                        <IoMdAddCircle className="size-9 text-blue-500 bg-white rounded-full shadow-lg" />
                    </ButtonIcon>
                </div>
            </div>
            <div>
                <PlansTable plans={filteredPlans} sections={sections} />
            </div>
            <div className="fixed bottom-4 right-4 sm:hidden z-50">
                <ButtonIcon onClick={() => setIsModalOpen(true)}>
                    <IoMdAddCircle className="size-16 text-blue-500 bg-white rounded-full shadow-lg" />
                </ButtonIcon>
            </div>
            {isModalOpen && (
                <CreatePlanForm
                    type="create"
                    onClose={() => setIsModalOpen(false)}
                    planSections={sections}
                />
            )}
        </>
    )
}

export default Plans
