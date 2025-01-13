import PropTypes from "prop-types";

function DragDropList({ items, selectedItems }) {
    const filteredItems = items.filter(item => selectedItems.map(Number).includes(item.id));

    return (
        <ul>
            {filteredItems.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}  
        </ul>
    )
}

export default DragDropList

DragDropList.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired
}