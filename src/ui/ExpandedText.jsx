function ExpandedText({ isExpanded, item, property, handleToggle }) {
    return (
        <div className="relative flex flex-col">
            <span
                className={`italic min-w-52  ${
                    isExpanded ? '' : 'line-clamp-3'
                }`}
            >
                {item[property] || 'No description available'}
            </span>
            {item[property] && (
                <button
                    onClick={() => handleToggle(property, item.id)}
                    className="text-blue-500 self-end"
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    )
}

export default ExpandedText
