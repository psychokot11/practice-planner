import { useState } from 'react'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { usePlans } from '../features/plans/usePlans'
import { useDrills } from '../features/drills/useDrills'
import { useTags } from '../features/tags/useTags'
import { useSettings } from '../features/settings/useSettings'
import ButtonTile from '../ui/buttons/ButtonTile'
import Spinner from '../ui/Spinner'
import CreatePlanForm from '../features/plans/CreatePlanForm'
import PlansTable from '../features/plans/PlansTable'

function Plans() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isLoading, plans } = usePlans()
    const { isLoading: isLoadingDrills, drills } = useDrills()
    const { isLoading: isLoadingTags, tags } = useTags()
    const { isLoading: isLoadingSettings, settings } = useSettings()

    const sections = settings ? settings[0].stages : []

    const isDataReady =
        !isLoading && !isLoadingDrills && !isLoadingTags && !isLoadingSettings

    if (!isDataReady) return <Spinner />

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Plans</h1>
                <div className="flex gap-24 justify-around items-center">
                    <ButtonTile onClick={() => setIsModalOpen(true)}>
                        <MdOutlineDashboardCustomize className="size-10" />
                        new <br /> custom plan
                    </ButtonTile>
                </div>
            </div>
            <div>
                <PlansTable plans={plans} sections={sections} />
            </div>
            {isModalOpen && (
                <CreatePlanForm
                    type="create"
                    onClose={() => setIsModalOpen(false)}
                    planSections={sections}
                    drills={drills}
                    tags={tags}
                />
            )}
        </>
    )
}

export default Plans
