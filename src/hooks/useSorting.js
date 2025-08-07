import { useState, useMemo } from 'react'

function useSorting(data, defaultColumn = '', defaultDirection = 'asc') {
    const [sortColumn, setSortColumn] = useState(defaultColumn)
    const [sortDirection, setSortDirection] = useState(defaultDirection)

    function handleSort(column) {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const sortedData = useMemo(() => {
        if (!sortColumn || !data) return data

        return [...data].sort((a, b) => {
            let aValue = a[sortColumn]
            let bValue = b[sortColumn]

            if (sortColumn === 'name') {
                aValue = aValue?.toLowerCase() || ''
                bValue = bValue?.toLowerCase() || ''
            }

            if (sortColumn === 'minNumPlayers') {
                aValue = Number(aValue) || 0
                bValue = Number(bValue) || 0
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
    }, [data, sortColumn, sortDirection])

    return {
        sortColumn,
        sortDirection,
        handleSort,
        sortedData,
    }
}

export default useSorting