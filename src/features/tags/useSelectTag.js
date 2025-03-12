import { useEffect, useState } from 'react'

export function useSelectTag(formItem, drills) {
    const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState(
        Array.isArray(formItem?.tags) ? formItem.tags : []
    )
    const [filteredDrills, setFilteredDrills] = useState(drills)

    function handleTagDropdownToggle(item) {
        if (item === 'tags') {
            setIsTagsDropdownOpen((prev) => !prev)
        }
    }

    function handleTagChange(event) {
        const { value, checked } = event.target

        setSelectedTags((prevTags) => {
            if (checked) {
                return [...prevTags, value]
            } else {
                return prevTags.filter((tag) => tag !== value)
            }
        })
    }

    useEffect(() => {
        console.log(selectedTags)
        console.log(drills)
        if (selectedTags.length === 0) {
            setFilteredDrills(drills)
        } else {
            setFilteredDrills(
                drills.filter(
                    (drill) =>
                        Array.isArray(drill.tags) &&
                        drill.tags.some((tag) => selectedTags.includes(tag))
                )
            )
        }
    }, [selectedTags, drills])

    return {
        handleTagDropdownToggle,
        isTagsDropdownOpen,
        handleTagChange,
        selectedTags,
        filteredDrills,
    }
}
