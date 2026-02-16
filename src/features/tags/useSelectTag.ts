import React, { useEffect, useState } from 'react'
import { Drill, Plan } from '../../types'

export function useSelectTag(
    formItem: Partial<Drill | Plan> = {},
    filteredByCountDrills: Drill[]
) {
    const drills = filteredByCountDrills
    const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false)
    // TODO: Refactor tags to use a single format (Tag objects) across DB and app
    const [selectedTags, setSelectedTags] = useState<string[]>(
        Array.isArray(formItem?.tags)
            ? formItem.tags.map((tag) =>
                  typeof tag === 'string' ? tag : tag.name
              )
            : []
    )
    const [filteredDrills, setFilteredDrills] = useState(drills)

    function handleTagDropdownToggle(item: string) {
        if (item === 'tags') {
            setIsTagsDropdownOpen((prev) => !prev)
        }
    }

    function handleTagChange(event: React.ChangeEvent<HTMLInputElement>) {
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
        if (selectedTags.length === 0) {
            setFilteredDrills(drills)
        } else {
            setFilteredDrills(
                drills.filter(
                    (drill) =>
                        Array.isArray(drill.tags) &&
                        drill.tags.some((tag) =>
                            selectedTags.includes(tag.name)
                        )
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
