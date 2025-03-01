import { useState } from 'react'

export function useSetPlan(plan) {
    const [practicePlan, setPracticePlan] = useState(
        plan?.drills ? plan.drills : {}
    )

    function handleSortedListChange(sortedList, key) {
        setPracticePlan((prev) => {
            if (JSON.stringify(prev[key]) === JSON.stringify(sortedList)) {
                return prev
            }

            return {
                ...prev,
                [key]: sortedList,
            }
        })
    }

    return { handleSortedListChange, practicePlan }
}
