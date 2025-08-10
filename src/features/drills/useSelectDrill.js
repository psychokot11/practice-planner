import { useState } from 'react'

export function useSelectDrill(sections, plan) {
    const initialDropdownState = sections.reduce((acc, section) => {
        acc[section] = false
        return acc
    }, {})

    const [isDrillsDropdownOpen, setIsDrillsDropdownOpen] =
        useState(initialDropdownState)

    function handleDrillDropdownToggle(section) {
        setIsDrillsDropdownOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }))
    }

    const initialDrillsState = sections.reduce((acc, section) => {
        acc[section] = []
        return acc
    }, {})

    const [selectedDrills, setSelectedDrills] = useState(
        plan?.drills ? plan?.drills : initialDrillsState
    )

    function handleDrillChange(section, event, drillItem) {
        const { value, checked } = event.target

        setSelectedDrills((prevState) => {
            const updatedSection = checked
                ? [...prevState[section], drillItem]
                : prevState[section].filter((drill) => String(drill.id) !== String(value))

            return {
                ...prevState,
                [section]: updatedSection,
            }
        })
    }

    function handleRemoveDrill(section, drillId) {
        setSelectedDrills((prevState) => {
            const updatedSection = prevState[section].filter(
                (drill) => drill.id !== drillId
            )

            return {
                ...prevState,
                [section]: updatedSection,
            }
        })
    }

    return {
        selectedDrills,
        setSelectedDrills,
        isDrillsDropdownOpen,
        handleDrillChange,
        handleRemoveDrill,
        handleDrillDropdownToggle,
    }
}
