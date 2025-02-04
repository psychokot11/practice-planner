import { useDrills } from '../drills/useDrills'

function PlanOrderedList({ title, items }) {
    const { drills } = useDrills()

    if (!items) {
        return null
    }

    const numericItems = items.map(Number)

    const result = drills
        .filter((drill) => numericItems.includes(drill.id))
        .map((drill) => ({ id: drill.id, name: drill.name }))

    return (
        <div>
            <h3 className="font-semibold">{title}</h3>
            <ol className="list-decimal list-inside">
                {result.map((drill) => (
                    <li key={drill.id}>{drill.name}</li>
                ))}
            </ol>
        </div>
    )
}

export default PlanOrderedList
