import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import SortableList from './SortableList'
import Button from './buttons/Button'

const backendOptions = {
    enableMouseEvents: true,
}

function DropdownList({
    details,
    items,
    selectedItems,
    isDropdownOpen,
    handleDropdownToggle,
    handleChange,
}) {
    return (
        <>
            <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {details.title}
                </label>
                <Button
                    type="button"
                    onClick={() => handleDropdownToggle('drills')}
                    icon="dropdown"
                    flex
                    fullWidth
                >
                    {details.dropDownText}
                </Button>
                <div
                    className={`${
                        !isDropdownOpen && 'hidden'
                    } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 w-full`}
                >
                    <ul
                        className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200 max-h-40 overflow-y-auto"
                        aria-labelledby="dropdownList"
                    >
                        {items.map((item) => (
                            <li key={item.id}>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        type="checkbox"
                                        id={item.id}
                                        name={item.name}
                                        value={item.id}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor={item.id}
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {item.name}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {details.isSortable && (
                <DndProvider backend={TouchBackend} options={backendOptions}>
                    <SortableList items={items} selectedItems={selectedItems} />
                </DndProvider>
            )}
        </>
    )
}

export default DropdownList
