import Button from '../../ui/buttons/Button'

function TagsCheckboxList({
    tags,
    handleTagChange,
    type,
    plan,
    drill,
    handleDropdownToggle,
    isDropdownOpen,
}) {
    const defaultItem = plan || drill

    return (
        <div className="relative">
            <Button
                onClick={handleDropdownToggle}
                type="button"
                icon="dropdown"
                flex
                fullWidth
            >
                Choose main focus areas
            </Button>
            <div
                className={`${
                    !isDropdownOpen && 'hidden'
                } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 w-full`}
            >
                <ul
                    className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200 max-h-40 overflow-y-auto"
                    aria-labelledby="dropdownCheckboxButton"
                >
                    {tags.map((tag) => (
                        <li key={tag.id}>
                            <div className="flex items-center">
                                <input
                                    onChange={handleTagChange}
                                    type="checkbox"
                                    id={tag.id}
                                    name={tag.name}
                                    value={tag.name}
                                    defaultChecked={
                                        type === 'edit' &&
                                        defaultItem.tags.includes(tag.name)
                                    }
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor={tag.id}
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {tag.name}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TagsCheckboxList
