import { useDrills } from '../drills/useDrills'

function PlanOrderedList({ title, items }) {
    const { drills } = useDrills()

    if (!items) {
        return null
    }

    const numericItems = items && items.map(Number)

    const filteredDrills = drills && 
        drills.filter((drill) => numericItems.includes(drill.id))
        .map((drill) => ({ id: drill.id, name: drill.name }))

    return (
        <div>
            <h3 className="font-semibold">{title}</h3>
            <ol className="list-decimal list-inside">
                {filteredDrills.map((drill) => (
                    <li key={drill.id}>{drill.name}</li>
                ))}
            </ol>
        </div>
    )
}

export default PlanOrderedList
