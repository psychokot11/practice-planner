import { useState } from 'react'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { usePlans } from '../features/plans/usePlans'
import { useDrills } from '../features/drills/useDrills'
import { useTags } from '../features/tags/useTags'
import ButtonTile from '../ui/buttons/ButtonTile'
import Spinner from '../ui/Spinner'
import CreatePlanForm from '../features/plans/CreatePlanForm'
import CreateRandomPlanForm from '../features/plans/CreateRandomPlanForm'
import PlansTable from '../features/plans/PlansTable'

//TODO: in the future move those sections to the database and edit in settings
const sections = [
    { key: 'warmUp', title: 'Warm up' },
    { key: 'mainPart', title: 'Main part' },
    { key: 'closingExercise', title: 'Closing exercise' },
]

function Plans() {
    const [isRandomModalOpen, setIsRandomModalOpen] = useState(false)
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)
    const { isLoading, plans } = usePlans()
    const { isLoading: isLoadingDrills, drills } = useDrills()
    const { isLoading: isLoadingTags, tags } = useTags()

    const isDataReady = !isLoading && !isLoadingDrills && !isLoadingTags

    if (isLoading) return <Spinner />

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Plans</h1>
                <div className="flex gap-24 justify-around items-center">
                    <ButtonTile onClick={() => setIsRandomModalOpen(true)}>
                        <GiPerspectiveDiceSixFacesRandom className="size-10" />
                        new <br /> random plan
                    </ButtonTile>
                    <ButtonTile onClick={() => setIsCustomModalOpen(true)}>
                        <MdOutlineDashboardCustomize className="size-10" />
                        new <br /> custom plan
                    </ButtonTile>
                </div>
            </div>
            <div>
                <PlansTable plans={plans} sections={sections} />
            </div>
            {isCustomModalOpen && (
                <CreatePlanForm
                    type="create"
                    onClose={() => setIsCustomModalOpen(false)}
                    planSections={sections}
                />
            )}
            {isRandomModalOpen && isDataReady && (
                <CreateRandomPlanForm
                    drills={drills}
                    tags={tags}
                    onClose={() => setIsRandomModalOpen(false)}
                />
            )}
        </>
    )
}

export default Plans
