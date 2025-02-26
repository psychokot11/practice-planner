import { useState, useEffect } from 'react'
import SortableItem from './SortableItem'

const SortableList = ({ items, selectedItems, handleSortedListChange }) => {
    const [sortedItems, setSortedItems] = useState([])
    const [newIndex, setNewIndex] = useState(null)

    useEffect(() => {
        const filteredItems = items
            .filter((item) => selectedItems.map(Number).includes(item.id))
            .map((item) => item)
        setSortedItems(filteredItems)
    }, [items, selectedItems])

    useEffect(() => {
        if (handleSortedListChange) {
            const sortedData = sortedItems
                .map((item, index) => ({
                    id: item.id,
                    index,
                }))
                .sort((a, b) => a.index - b.index)
            // console.log(sortedData)
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
