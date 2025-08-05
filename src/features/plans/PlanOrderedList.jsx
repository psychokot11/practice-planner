import { useDrills } from '../drills/useDrills'
import Button from '../../ui/buttons/Button'

function PlanList({ title, items }) {
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
                link: drill.link,
            }))
            .sort(
                (a, b) =>
                    numericItems.indexOf(a.id) - numericItems.indexOf(b.id)
            )

    return (
        <div>
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{title}</h5>
            <ul className="list-disc list-outside ml-6 space-y-2">
                {filteredDrills &&
                    filteredDrills.map((drill) => (
                        <li key={drill.id} className="space-y-1">
                            <span className="text-sm text-gray-900 dark:text-white">
                                {drill.name}
                                {drill.description && (
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {' - '}{drill.description}
                                    </span>
                                )}
                            </span>
                            {drill.link && (
                                <div className="mt-1">
                                    <Button
                                        subtype="tertiary"
                                        icon="small-arrow"
                                        flex
                                        onClick={() => window.open(drill.link, '_blank')}
                                    >
                                        Watch video
                                    </Button>
                                </div>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default PlanList
