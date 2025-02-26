import { FaCircleInfo } from 'react-icons/fa6'
import Tooltip from '../../ui/Tooltip'
import { useDrills } from '../drills/useDrills'

function PlanOrderedList({ title, items }) {
    const { drills } = useDrills()

    if (!items) {
        return null
    }

    const numericItems = items ? items.map((item) => Number(item.id)) : []

    const filteredDrills =
        drills &&
        drills
            .filter((drill) => numericItems.includes(drill.id))
            .map((drill) => ({
                id: drill.id,
                name: drill.name,
                description: drill.description,
            }))
            .sort(
                (a, b) =>
                    numericItems.indexOf(a.id) - numericItems.indexOf(b.id)
            )

    return (
        <div>
            <h3 className="font-semibold">{title}</h3>
            <ol className="list-decimal list-inside">
                {filteredDrills &&
                    filteredDrills.map((drill) => (
                        <li key={drill.id} className="flex gap-2">
                            {drill.name}
                            {drill.description && (
                                <Tooltip message={drill.description}>
                                    <FaCircleInfo />
                                </Tooltip>
                            )}
                        </li>
                    ))}
            </ol>
        </div>
    )
}

export default PlanOrderedList
