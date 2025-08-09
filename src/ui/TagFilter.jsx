import { useState, useRef, useEffect } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import Button from './buttons/Button'

function TagFilter({ 
    allTags, 
    selectedTags, 
    incompatibleTags, 
    onTagToggle, 
    onClearFilters,
    hasActiveFilters,
    itemType = 'items' // 'plans', 'drills', or generic 'items'
}) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        function handleEscapeKey(event) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEscapeKey)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isOpen])

    if (!allTags || allTags.length === 0) return null

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex gap-2 items-center">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="flex items-center justify-between min-w-[140px] bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
                >
                    <span>
                        {hasActiveFilters 
                            ? `Filter by tags (${selectedTags.length})` 
                            : 'Filter by tags'
                        }
                    </span>
                    <IoMdArrowDropdown className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {hasActiveFilters && (
                    <Button
                        onClick={onClearFilters}
                        type="button"
                        className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-300 rounded-lg"
                    >
                        Clear filters
                    </Button>
                )}
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg min-w-[250px] max-h-64 overflow-y-auto">
                    <div className="p-3">
                        <div className="text-xs font-medium text-gray-500 uppercase mb-3">
                            Select tags to filter {itemType}
                        </div>
                        
                        <div className="space-y-2">
                            {allTags.map((tag) => {
                                const isSelected = selectedTags.includes(tag)
                                const isIncompatible = incompatibleTags.includes(tag)
                                const isDisabled = isIncompatible && !isSelected

                                return (
                                    <label
                                        key={tag}
                                        className={`flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer ${
                                            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            disabled={isDisabled}
                                            onChange={() => !isDisabled && onTagToggle(tag)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                                        />
                                        <span className={`ml-2 text-sm ${
                                            isDisabled ? 'text-gray-400' : 'text-gray-700'
                                        }`}>
                                            {tag}
                                        </span>
                                        {isIncompatible && !isSelected && (
                                            <span className="ml-auto text-xs text-gray-400">
                                                (incompatible)
                                            </span>
                                        )}
                                    </label>
                                )
                            })}
                        </div>
                        
                        {selectedTags.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="text-xs text-gray-500 mb-2">
                                    Active filters:
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {selectedTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => onTagToggle(tag)}
                                                className="ml-1 hover:text-blue-900"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TagFilter