import { useEffect, useState } from 'react'

export function useFilterByPlayerCount(drills, plan) {
    const [playersCount, setPlayersCount] = useState(
        plan?.minNumPlayers ? plan.minNumPlayers : 2
    )
    const [filteredByCountDrills, setFilteredByCountDrills] = useState([])

    useEffect(() => {
        const filteredDrills =
            drills &&
            drills.filter((drill) => drill.minNumPlayers <= playersCount)
        setFilteredByCountDrills(filteredDrills)
    }, [playersCount, drills])

    return { setPlayersCount, filteredByCountDrills }
}
