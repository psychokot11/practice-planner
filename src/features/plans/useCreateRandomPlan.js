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
            return drill.tags?.some((tag) => selectedTags.includes(tag))
        }

        const getRandomSubset = (array, count) => {
            const shuffled = [...array].sort(() => 0.5 - Math.random())
            return shuffled.slice(0, count)
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

                setWarningMessage(warnings.join('\n'))
            }

            result[stageKey] = selectedDrills
        })

        setSelectedDrills(result)
    }

    return {
        handleSetRandomPlan,
        handleDrillsCountChange,
        warningMessage,
    }
}
