import { useEffect, useRef, useState } from 'react'
import Button from '../../ui/buttons/Button'
import { useCreateTag } from './useCreateTags'
import { toast } from 'react-hot-toast'

function TagsCheckboxList({
    tags,
    handleTagChange,
    type,
    item,
    handleDropdownToggle,
    isDropdownOpen,
}) {
    const dropdownRef = useRef(null)
    const [newTagName, setNewTagName] = useState('')
    const [isCreatingNewTag, setIsCreatingNewTag] = useState(false)
    const [recentlyCreatedTags, setRecentlyCreatedTags] = useState([])
    const { createTag, isCreating } = useCreateTag()

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

    const handleCreateNewTag = (e) => {
        e.preventDefault()
        if (newTagName.trim()) {
            const trimmedName = newTagName.trim()
            // Check if tag already exists in database or was recently created (case-insensitive)
            const existingTag = tags.find(
                (tag) => tag.name.toLowerCase() === trimmedName.toLowerCase()
            )
            const recentlyCreated = recentlyCreatedTags.find(
                (tagName) => tagName.toLowerCase() === trimmedName.toLowerCase()
            )
            
            if (existingTag) {
                // If tag exists, just select it instead of creating duplicate
                const fakeEvent = {
                    target: {
                        checked: true,
                        name: existingTag.name,
                        value: existingTag.name,
                    },
                }
                handleTagChange(fakeEvent)
                setNewTagName('')
                setIsCreatingNewTag(false)
                toast.error(`Tag "${existingTag.name}" already exists`)
                return
            }

            if (recentlyCreated) {
                // Tag was just created, prevent duplicate creation
                setNewTagName('')
                setIsCreatingNewTag(false)
                toast.error(`Tag "${recentlyCreated}" already exists`)
                return
            }

            // Add to recently created tags to prevent immediate duplicates
            setRecentlyCreatedTags(prev => [...prev, trimmedName])

            createTag(
                { name: trimmedName },
                {
                    onSuccess: (data) => {
                        // Automatically select the new tag
                        const newTag = data[0]
                        const fakeEvent = {
                            target: {
                                checked: true,
                                name: newTag.name,
                                value: newTag.name,
                            },
                        }
                        handleTagChange(fakeEvent)
                        setNewTagName('')
                        setIsCreatingNewTag(false)
                        // Remove from recently created after successful creation
                        setTimeout(() => {
                            setRecentlyCreatedTags(prev => 
                                prev.filter(tagName => tagName.toLowerCase() !== trimmedName.toLowerCase())
                            )
                        }, 2000) // Remove after 2 seconds
                    },
                    onError: (err) => {
                        // Remove from recently created if creation failed
                        setRecentlyCreatedTags(prev => 
                            prev.filter(tagName => tagName.toLowerCase() !== trimmedName.toLowerCase())
                        )
                        // Show error toast (in case the hook's onError doesn't run)
                        toast.error(err.message + ' Please try again')
                    }
                }
            )
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateNewTag(e)
        } else if (e.key === 'Escape') {
            setIsCreatingNewTag(false)
            setNewTagName('')
        }
    }

    if (!tags) {
        return null
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                onClick={() => handleDropdownToggle(!isDropdownOpen)}
                type="button"
                icon="dropdown"
                flex
                fullWidth
            >
                Choose tags
            </Button>
            <div
                className={`${
                    !isDropdownOpen && 'hidden'
                } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 w-full`}
            >
                <div className="p-3">
                    {/* New tag creation section */}
                    <div className="pb-3 mb-3 border-b border-gray-200 dark:border-gray-600">
                        {!isCreatingNewTag ? (
                            <button
                                onClick={() => setIsCreatingNewTag(true)}
                                type="button"
                                className="w-full text-left p-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex items-center"
                                disabled={isCreating}
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                Create new tag
                            </button>
                        ) : (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Tag name"
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    autoFocus
                                    disabled={isCreating}
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleCreateNewTag}
                                        type="button"
                                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                        disabled={isCreating || !newTagName.trim()}
                                    >
                                        {isCreating ? '...' : 'Add'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsCreatingNewTag(false)
                                            setNewTagName('')
                                        }}
                                        type="button"
                                        className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                                        disabled={isCreating}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Existing tags list */}
                    <ul
                        className="space-y-3 text-sm text-gray-700 dark:text-gray-200 max-h-40 overflow-y-auto"
                        aria-labelledby="dropdownCheckboxButton"
                    >
                        {[...tags].sort((a, b) => a.name.localeCompare(b.name)).map((tag) => (
                            <li key={tag.id}>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleTagChange}
                                        type="checkbox"
                                        id={tag.id}
                                        name={tag.name}
                                        value={tag.name}
                                        defaultChecked={
                                            type === 'edit' && item?.tags
                                                ? item.tags.includes(tag.name)
                                                : false
                                        }
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor={tag.id}
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 lowercase"
                                    >
                                        {tag.name}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TagsCheckboxList
