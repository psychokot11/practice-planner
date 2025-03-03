import { useState, useEffect, useMemo } from 'react'
import SortableItem from './SortableItem'

const SortableList = ({ items, selectedItems, handleSortedListChange }) => {
    const selectedIds = useMemo(
        () => selectedItems.map((item) => Number(item.id ? item.id : item)),
        [selectedItems]
    )

    const [sortedItems, setSortedItems] = useState([])

    // eslint-disable-next-line no-unused-vars
    const [newIndex, setNewIndex] = useState(null)

    useEffect(() => {
        const filteredItems = items.filter((item) =>
            selectedIds.includes(item.id)
        )
        setSortedItems(filteredItems)
    }, [items, selectedIds])

    useEffect(() => {
        if (handleSortedListChange) {
            const sortedData = sortedItems
                .map((item, index) => ({
                    id: item.id,
                    index,
                }))
                .sort((a, b) => a.index - b.index)

            handleSortedListChange(sortedData)
        }
    }, [sortedItems, handleSortedListChange])

    return (
        <ul>
            {sortedItems.map((item, index) => (
                <SortableItem
                    key={item.id}
                    item={item}
                    index={index}
                    sortedItems={sortedItems}
                    setSortedItems={setSortedItems}
                    setIndex={setNewIndex}
                />
            ))}
        </ul>
    )
}

export default SortableList
