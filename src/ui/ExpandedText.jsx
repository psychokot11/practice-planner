function ExpandedText({ isExpanded, item, property, handleToggle }) {
    const description = item[property]
    const showButton = description.length > 150

    return (
        <div className="relative flex flex-col">
            <span className="italic">
                {isExpanded
                    ? description
                    : `${description.substring(0, 150)}` ||
                      'No description available'}
            </span>
            {item[property] && showButton && (
                <button
                    onClick={() => handleToggle(property, item.id)}
                    className="text-blue-500 self-end hover:text-blue-700"
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    )
}

export default ExpandedText
