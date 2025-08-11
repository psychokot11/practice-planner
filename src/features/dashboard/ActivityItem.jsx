import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'

function ActivityItem({ type, name, createdAt, icon, bgColor, iconColor, to }) {
    const timeAgo = createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : 'Unknown'
    
    return (
        <Link 
            to={to}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
            <div className={`${bgColor} p-2 rounded-full flex items-center justify-center flex-shrink-0`}>
                <div className={`${iconColor} w-4 h-4`}>
                    {icon}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {name}
                </p>
                <p className="text-xs text-gray-500">
                    {type} • {timeAgo}
                </p>
            </div>
        </Link>
    )
}

export default ActivityItem