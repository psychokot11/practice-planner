import Button from '../../ui/buttons/Button'
import PlanOrderedList from './PlanOrderedList'

function PlanDetailsModal({ plan, sections, onClose }) {
    if (!plan) return null

    // Support both formats for tags
    const tags = Array.isArray(plan.tags)
        ? plan.tags
        : typeof plan.tags === 'string'
        ? plan.tags.split(',').map((tag) => tag.trim())
        : []

    return (
        <div>
            <div
                tabIndex="-1"
                aria-hidden="true"
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-4xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {plan.name}
                            </h3>
                            <Button
                                onClick={onClose}
                                type="button"
                                subtype="close"
                                icon="close"
                            >
                                <span className="sr-only">Close modal</span>
                            </Button>
                        </div>
                        <div className="p-4 md:p-5 space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Minimum Players
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {plan.minNumPlayers}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Focus Areas
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
                                            >
                                                {typeof tag === 'object' ? tag.name : tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {plan.description && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Description
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {plan.description}
                                    </p>
                                </div>
                            )}

                            {/* Detailed Plan */}
                            {plan.drills && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                        Practice Plan
                                    </h4>
                                    <div className="space-y-4">
                                        {sections.map((section) => (
                                            <PlanOrderedList
                                                key={section.key}
                                                title={section.title}
                                                items={plan.drills?.[section.key]}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Comments */}
                            {plan.comments && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Comments
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {plan.comments}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
        </div>
    )
}

export default PlanDetailsModal