import { useState } from 'react'

export function useSelectTag(plan) {
    const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState(
        plan?.tags ? plan.tags : []
    )

    function handleTagDropdownToggle(item) {
        item === 'tags' && setIsTagsDropdownOpen(!isTagsDropdownOpen)
    }

    function handleTagChange(event) {
        const { value, checked } = event.target

        let tagsArray = []

        if (typeof selectedTags === 'string') {
            tagsArray = selectedTags.split(',').map((tag) => tag.trim())
        }

        if (checked) {
            if (!tagsArray.includes(value)) {
                tagsArray.push(value)
            }
            setSelectedTags(tagsArray.join(', '))
        } else {
            const filteredTags = tagsArray.filter((tag) => tag !== value)
            setSelectedTags(filteredTags.join(', '))
        }
    }

    return {
        handleTagDropdownToggle,
        isTagsDropdownOpen,
        handleTagChange,
        selectedTags,
    }
}
