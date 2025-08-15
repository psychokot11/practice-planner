import { usePlans } from '../features/plans/usePlans'
import { useDrills } from '../features/drills/useDrills'
import { useTags } from '../features/tags/useTags'
import StatTile from '../features/dashboard/StatTile'
import PopularTagsChart from '../features/dashboard/PopularTagsChart'
import TimelineChart from '../features/dashboard/TimelineChart'
import RecentActivity from '../features/dashboard/RecentActivity'
import {
    HiClipboardDocumentList,
    HiOutlineLightBulb,
    HiTag,
    HiStar,
} from 'react-icons/hi2'

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
                    to="/plans"
                />
                <StatTile
                    icon={<HiOutlineLightBulb className="w-full h-full" />}
                    title="Drills"
                    count={drillsCount}
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                    to="/drills"
                />
                <StatTile
                    icon={<HiTag className="w-full h-full" />}
                    title="Tags"
                    count={tagsCount}
                    bgColor="bg-purple-100"
                    iconColor="text-purple-600"
                    to="/tags"
                />
                <StatTile
                    icon={<HiStar className="w-full h-full" />}
                    title="Starred"
                    count={starredCount}
                    bgColor="bg-yellow-100"
                    iconColor="text-yellow-600"
                    to="/plans"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <PopularTagsChart />
                    <RecentActivity />
                </div>

                <div className="space-y-6">
                    <TimelineChart
                        data={drills || []}
                        title="Drills Created (Last 30 Days)"
                        color="#10B981"
                        dataType="Drills"
                    />
                    <TimelineChart
                        data={plans || []}
                        title="Plans Created (Last 30 Days)"
                        color="#3B82F6"
                        dataType="Plans"
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
