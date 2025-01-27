import { useState } from 'react'

export function useSelectDrill(sections) {
    const initialDrillsState = sections.reduce((acc, section) => {
        acc[section] = []
        return acc
    }, {})

    const initialDropdownState = sections.reduce((acc, section) => {
        acc[section] = false
        return acc
    }, {})

    const [selectedDrills, setSelectedDrills] = useState(initialDrillsState)
    const [isDrillsDropdownOpen, setIsDrillsDropdownOpen] =
        useState(initialDropdownState)

    const handleDrillChange = (section, event) => {
        const { value, checked } = event.target

        setSelectedDrills((prevState) => {
            const updatedSection = checked
                ? [...prevState[section], value]
                : prevState[section].filter((drill) => drill !== value)

            return {
                ...prevState,
                [section]: updatedSection,
            }
        })
    }

    const handleDrillDropdownToggle = (section) => {
        setIsDrillsDropdownOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }))
    }

    return {
        selectedDrills,
        isDrillsDropdownOpen,
        handleDrillChange,
        handleDrillDropdownToggle,
    }
}
