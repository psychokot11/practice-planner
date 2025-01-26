import { useDrag, useDrop } from 'react-dnd'
import { FaCircleInfo } from 'react-icons/fa6'
import Tooltip from './Tooltip'

const ItemTypes = {
    CARD: 'card',
}

function SortableItem({ item, index, sortedItems, setSortedItems }) {
    const { name, description, link, tags } = item
    console.log(name, description, link, tags)

    const moveItem = (dragIndex, hoverIndex) => {
        const draggedItem = sortedItems[dragIndex]
        const newSortedItems = [...sortedItems]
        newSortedItems.splice(dragIndex, 1)
        newSortedItems.splice(hoverIndex, 0, draggedItem)
        setSortedItems(newSortedItems)
    }

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { type: ItemTypes.CARD, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover: (item) => {
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    return (
        <li
            ref={(node) => drag(drop(node))}
            className={`flex gap-2 bg-neutral-50 p-4 my-2 rounded-lg shadow-md ${
                isDragging ? 'opacity-50' : ''
            }`}
            style={{ cursor: 'move' }}
        >
            {name}
            {description && (
                <Tooltip message={description}>
                    <FaCircleInfo />
                </Tooltip>
            )}
        </li>
    )
}

export default SortableItem
