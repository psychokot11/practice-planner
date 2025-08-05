function ExpandedText({ isExpanded, item, property, handleToggle }) {
    const description = item[property] || ''
    const longDescription = description.length > 150

    return (
        <div className="relative flex flex-col">
            <span className="italic">
                {isExpanded
                    ? description
                    : description
                    ? longDescription
                        ? `${description.substring(0, 150)}...`
                        : description.substring(0, 150)
                    : 'No description added'}
            </span>
            {item[property] && longDescription && (
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
