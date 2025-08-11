
import { usePlans } from '../features/plans/usePlans'
import { useDrills } from '../features/drills/useDrills'
import { useTags } from '../features/tags/useTags'
import StatTile from '../features/dashboard/StatTile'
import { HiClipboardDocumentList, HiCog6Tooth, HiTag, HiStar } from 'react-icons/hi2'

function Dashboard() {
    const { plans } = usePlans()
    const { drills } = useDrills()
    const { tags } = useTags()

    const plansCount = plans?.length || 0
    const drillsCount = drills?.length || 0
    const tagsCount = tags?.length || 0
    const starredCount = 0 // To be implemented

    return (
        <div className="space-y-8">
            <h1>Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatTile
                    icon={<HiClipboardDocumentList className="w-full h-full" />}
                    title="Plans"
                    count={plansCount}
                    bgColor="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatTile
                    icon={<HiCog6Tooth className="w-full h-full" />}
                    title="Drills"
                    count={drillsCount}
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                />
                <StatTile
                    icon={<HiTag className="w-full h-full" />}
                    title="Tags"
                    count={tagsCount}
                    bgColor="bg-purple-100"
                    iconColor="text-purple-600"
                />
                <StatTile
                    icon={<HiStar className="w-full h-full" />}
                    title="Starred"
                    count={starredCount}
                    bgColor="bg-yellow-100"
                    iconColor="text-yellow-600"
                />
            </div>
        </div>
    )
}

export default Dashboard
