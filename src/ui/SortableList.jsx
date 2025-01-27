import { useState, useEffect } from 'react'
import SortableItem from './SortableItem'

const SortableList = ({ items, selectedItems }) => {
    const [sortedItems, setSortedItems] = useState([])

    useEffect(() => {
        const filteredItems = items
            .filter((item) => selectedItems.map(Number).includes(item.id))
            .map((item) => item)
        setSortedItems(filteredItems)
    }, [items, selectedItems])

    return (
        <ul>
            {sortedItems.map((item, index) => (
                <SortableItem
                    key={item.id}
                    item={item}
                    index={index}
                    sortedItems={sortedItems}
                    setSortedItems={setSortedItems}
                />
            ))}
        </ul>
    )
}

export default SortableList
