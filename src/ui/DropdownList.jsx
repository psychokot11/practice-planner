import { useEffect, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import SortableList from './SortableList'
import Button from './buttons/Button'
import Spinner from './Spinner'

const backendOptions = {
    enableMouseEvents: true,
}

function DropdownList({
    details,
    plan,
    items,
    sectionKey,
    selectedItems,
    isDropdownOpen,
    handleDropdownToggle,
    handleChange,
    handleSortedListChange,
}) {
    const dropdownRef = useRef(null)

    const isDataReady = items && selectedItems

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                handleDropdownToggle(false)
            }
        }

        function handleEscapeKey(event) {
            if (event.key === 'Escape') {
                handleDropdownToggle(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEscapeKey)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isDropdownOpen, handleDropdownToggle])

    if (!isDataReady) return <Spinner />

    return (
        <>
            <div className="relative" ref={dropdownRef}>
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
                                        defaultChecked={
                                            details.type === 'edit' &&
                                            plan.drills[sectionKey]?.some(
                                                (drill) => drill.id === item.id
                                            )
                                        }
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
                    <SortableList
                        items={items}
                        selectedItems={selectedItems}
                        handleSortedListChange={handleSortedListChange}
                    />
                </DndProvider>
            )}
        </>
    )
}

export default DropdownList
