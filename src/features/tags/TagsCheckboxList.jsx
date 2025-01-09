import PropTypes from "prop-types";
import Spinner from "../../ui/Spinner";

function TagsCheckboxList({ tags, isLoadingTags, handleTagChange, type, plan }) {
    const defaultItem = plan;
    if (isLoadingTags) return <Spinner />;

    return (
        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
            {isLoadingTags ? <Spinner /> : tags.map((tag) => (
                <li key={tag.id}>
                    <div className="flex items-center">
                        <input  onChange={handleTagChange}
                            type="checkbox" 
                            id={tag.id} 
                            name={tag.name} 
                            value={tag.name}
                            defaultChecked={(type === "edit" && defaultItem.focus) && defaultItem.focus.includes(tag.name)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor={tag.id} 
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tag.name}</label>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default TagsCheckboxList;

TagsCheckboxList.propTypes = {
    tags: PropTypes.array,
    isLoadingTags: PropTypes.bool.isRequired,
    handleTagChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    plan: PropTypes.object
}