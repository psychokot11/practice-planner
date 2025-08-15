import Button from './buttons/Button'

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
                <Button
                    onClick={() => handleToggle(property, item.id)}
                    subtype="tertiary"
                    align="right"
                    fullWidth
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </Button>
            )}
        </div>
    )
}

export default ExpandedText
