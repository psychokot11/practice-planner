import { usePlans } from '../plans/usePlans'
import { useDrills } from '../drills/useDrills'
import { useTags } from '../tags/useTags'
import ActivityItem from './ActivityItem'
import { HiClipboardDocumentList, HiCog6Tooth, HiTag } from 'react-icons/hi2'

function RecentActivity() {
    const { plans = [] } = usePlans()
    const { drills = [] } = useDrills()
    const { tags = [] } = useTags()

    const allActivities = [
        ...plans.map(plan => ({
            type: 'Plan',
            name: plan.name,
            createdAt: plan.created_at,
            icon: <HiClipboardDocumentList className="w-full h-full" />,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
            to: '/plans'
        })),
        ...drills.map(drill => ({
            type: 'Drill',
            name: drill.name,
            createdAt: drill.created_at,
            icon: <HiCog6Tooth className="w-full h-full" />,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
            to: '/drills'
        })),
        ...tags.map(tag => ({
            type: 'Tag',
            name: tag.name,
            createdAt: tag.created_at,
            icon: <HiTag className="w-full h-full" />,
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
            to: '/tags'
        }))
    ]

    const recentActivities = allActivities
        .filter(activity => activity.createdAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8)

    if (recentActivities.length === 0) {
        return (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="flex items-center justify-center h-48 text-gray-500">
                    <div className="text-center">
                        <p className="text-sm">No recent activity</p>
                        <p className="text-xs text-gray-400 mt-1">Start creating plans and drills!</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-1">
                {recentActivities.map((activity, index) => (
                    <ActivityItem
                        key={`${activity.type}-${activity.name}-${index}`}
                        type={activity.type}
                        name={activity.name}
                        createdAt={activity.createdAt}
                        icon={activity.icon}
                        bgColor={activity.bgColor}
                        iconColor={activity.iconColor}
                        to={activity.to}
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentActivity