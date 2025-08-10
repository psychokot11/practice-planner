import { useState } from 'react'

export function useCreateRandomPlan(
    sections,
    selectedTags,
    filteredByCountDrills,
    setSelectedDrills
) {
    const [drillsCount, setDrillsCount] = useState({
        warmUp: 0,
        coreSession: 0,
        finalChallenge: 0,
    })
    const [warningMessage, setWarningMessage] = useState('')

    function handleDrillsCountChange(event, key) {
        const value = event.target.value
        setDrillsCount((prevState) => ({
            ...prevState,
            [key]: Number(value),
        }))
    }

    function handleSetRandomPlan() {
        const result = {
            warmUp: [],
            coreSession: [],
            finalChallenge: [],
        }

        const usedDrillIds = new Set()
        const warnings = []

        const matchesTags = (drill) => {
            if (selectedTags.length === 0) return true
            if (!drill.tags || drill.tags.length === 0) return false
            
            // Using ANY logic: drill must have at least one of the selected tags
            // Alternative ALL logic would be: selectedTags.every(tag => drill.tags.includes(tag))
            return drill.tags.some((tag) => selectedTags.includes(tag))
        }

        const getRandomSubset = (array, count) => {
            // Fisher-Yates shuffle for true randomness
            const result = [...array]
            for (let i = result.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[result[i], result[j]] = [result[j], result[i]]
            }
            return result.slice(0, count)
        }

        Object.entries(drillsCount).forEach(([stageKey, count]) => {
            if (count === 0) return

            const matchingDrills = filteredByCountDrills.filter((drill) => {
                const hasStage = drill.stage?.some((s) => s.stage === stageKey)
                const notUsed = !usedDrillIds.has(drill.id)
                return hasStage && matchesTags(drill) && notUsed
            })

            const selectedDrills = getRandomSubset(matchingDrills, count)

            selectedDrills.forEach((drill) => usedDrillIds.add(drill.id))

            const section = sections.find((s) => s.key === stageKey)
            const title = section?.title || stageKey

            if (selectedDrills.length < count) {
                warnings.push(
                    `⚠️ Not enough drills for "${title}". Requested ${count}, found ${selectedDrills.length}.`
                )
            }

            result[stageKey] = selectedDrills
        })

        if (warnings.length > 0) {
            setWarningMessage(warnings.join('\n'))
        } else {
            setWarningMessage('')
        }

        setSelectedDrills(result)
    }

    return {
        handleSetRandomPlan,
        handleDrillsCountChange,
        warningMessage,
    }
}
