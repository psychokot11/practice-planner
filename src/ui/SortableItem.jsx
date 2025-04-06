import { useDrag, useDrop } from 'react-dnd'
import { FaCircleInfo } from 'react-icons/fa6'
import Tooltip from './Tooltip'
import Button from './buttons/Button'

const ItemTypes = {
    CARD: 'card',
}

function SortableItem({
    item,
    index,
    sortedItems,
    setSortedItems,
    setIndex,
    handleRemoveDrill,
    listKey,
}) {
    const { name, description, id } = item

    const moveItem = (dragIndex, hoverIndex) => {
        if (dragIndex === hoverIndex) return

        const updatedItems = [...sortedItems]
        const [draggedItem] = updatedItems.splice(dragIndex, 1)
        updatedItems.splice(hoverIndex, 0, draggedItem)

        setSortedItems(updatedItems.map((item, i) => ({ ...item, index: i })))

        setIndex(hoverIndex)
    }

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index)
                draggedItem.index = index
            }
        },
    })

    return (
        <li
            ref={(node) => drag(drop(node))}
            className={`flex items-center bg-neutral-50 p-4 my-2 rounded-lg shadow-md ${
                isDragging ? 'opacity-50' : ''
            }`}
            style={{ cursor: 'move' }}
        >
            <span className="flex gap-2">
                {name}
                {description && (
                    <Tooltip message={description}>
                        <FaCircleInfo className="text-sm" />
                    </Tooltip>
                )}
            </span>
            <Button
                onClick={() => handleRemoveDrill(listKey, id)}
                type="button"
                subtype="close"
                icon="close"
            >
                <span className="sr-only">Close modal</span>
            </Button>
        </li>
    )
}

export default SortableItem
