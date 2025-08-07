import { useState } from 'react'

export function useSelectStage(initialStages = []) {
    const [selectedStages, setSelectedStages] = useState(initialStages)

    const handleStageChange = (event) => {
        const { value, checked } = event.target

        setSelectedStages((prevStages) => {
            if (checked) {
                return [...prevStages, { stage: value }]
            } else {
                return prevStages.filter((s) => s.stage !== value)
            }
        })
    }

    return { selectedStages, handleStageChange }
}
