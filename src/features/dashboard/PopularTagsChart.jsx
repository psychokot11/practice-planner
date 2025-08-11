import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { usePlans } from '../plans/usePlans'

function PopularTagsChart() {
    const { plans = [] } = usePlans()

    const tagCounts = {}
    
    plans.forEach(plan => {
        if (plan.tags && Array.isArray(plan.tags)) {
            plan.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1
            })
        }
    })

    const popularTags = Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 6)
        .map(([tag, count]) => ({
            name: tag,
            plans: count
        }))

    if (popularTags.length === 0) {
        return (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Tags</h3>
                <div className="flex items-center justify-center h-64 text-gray-500">
                    No data available
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Tags</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularTags}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis />
                    <Tooltip 
                        formatter={(value) => [value, 'Plans']}
                        labelStyle={{ color: '#374151' }}
                    />
                    <Bar dataKey="plans" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PopularTagsChart