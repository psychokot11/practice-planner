import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays, startOfDay } from 'date-fns'

function TimelineChart({ data = [], title, color = '#3B82F6', dataType = 'Items' }) {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = startOfDay(subDays(new Date(), 29 - i))
        return {
            date: date,
            dateString: format(date, 'MMM dd'),
            count: 0
        }
    })

    data.forEach(item => {
        if (item.created_at) {
            const itemDate = startOfDay(new Date(item.created_at))
            const dayData = last30Days.find(day => 
                day.date.getTime() === itemDate.getTime()
            )
            if (dayData) {
                dayData.count += 1
            }
        }
    })

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={last30Days}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="dateString" 
                        tick={{ fontSize: 10 }}
                        interval={4}
                    />
                    <YAxis />
                    <Tooltip 
                        formatter={(value) => [value, `${dataType} Created`]}
                        labelStyle={{ color: '#374151' }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke={color} 
                        strokeWidth={2}
                        dot={{ fill: color, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TimelineChart