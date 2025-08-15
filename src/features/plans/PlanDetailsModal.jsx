import Button from '../../ui/buttons/Button'
import PlanList from './PlanOrderedList'
import { AiTwotoneCopy } from 'react-icons/ai'
import { useCopyPlan } from './useCopyPlan'

function PlanDetailsModal({ plan, sections, onClose }) {
    const { copyPlan } = useCopyPlan()

    if (!plan) return null

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
                className="flex overflow-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
            >
                <div className="relative p-4 w-full max-w-4xl h-full max-h-[90vh]">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <div className="flex items-center gap-1">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {plan.name}
                                </h3>
                                <button
                                    onClick={() => copyPlan(plan)}
                                    className="text-xl font-medium rounded-lg p-2 transition-all duration-100 ease-in hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-400 text-gray-600"
                                    title="Copy plan"
                                >
                                    <AiTwotoneCopy />
                                </button>
                            </div>
                            <Button
                                onClick={onClose}
                                type="button"
                                subtype="close"
                                icon="close"
                            >
                                <span className="sr-only">Close modal</span>
                            </Button>
                        </div>
                        <div
                            className="p-4 md:p-5 overflow-y-auto flex-1 min-h-0 mr-2 mb-2"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#d1d5db #f3f4f6',
                            }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Focus area
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
                                                >
                                                    {typeof tag === 'object'
                                                        ? tag.name
                                                        : tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Min. number of players
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {plan.minNumPlayers}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Description
                                        </h4>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-600 rounded-lg min-h-[60px]">
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                                {plan.description ||
                                                    'No description added'}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Comments
                                        </h4>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-600 rounded-lg min-h-[60px]">
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                                {plan.comments ||
                                                    'No comments added'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                            Plan
                                        </h4>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-600 rounded-lg min-h-[100px]">
                                            {plan.drills ? (
                                                <div className="space-y-4">
                                                    {sections.map((section) => (
                                                        <PlanList
                                                            key={section.key}
                                                            title={
                                                                section.title
                                                            }
                                                            items={
                                                                plan.drills?.[
                                                                    section.key
                                                                ]
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    No plan created
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
        </div>
    )
}

export default PlanDetailsModal
