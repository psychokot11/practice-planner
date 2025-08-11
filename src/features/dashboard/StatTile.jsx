function StatTile({ icon, title, count, bgColor, iconColor }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
                <div className={`${bgColor} p-3 rounded-full flex items-center justify-center`}>
                    <div className={`${iconColor} w-6 h-6`}>
                        {icon}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        {count}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StatTile