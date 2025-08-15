import { useState } from 'react'
import { useCopyPlan } from '../features/plans/useCopyPlan'
import { AiTwotoneDelete, AiTwotoneEdit, AiTwotoneCopy } from 'react-icons/ai'
import { IoMdPlay } from 'react-icons/io'
import PlanOrderedList from '../features/plans/PlanOrderedList'
import ExpandedText from './ExpandedText'

const iconClasses =
    'font-medium hover:cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-400'

function TableRow({
    data,
    dataType,
    properties,
    handleEditClick,
    handleOpenModal,
    handleRowClick,
    isDeleting,
    sections,
}) {
    const [expandedStates, setExpandedStates] = useState({})
    const { copyPlan } = useCopyPlan()

    function handleToggle(property, itemId) {
        setExpandedStates((prevState) => ({
            ...prevState,
            [itemId]: {
                ...prevState[itemId],
                [property]: !prevState[itemId]?.[property],
            },
        }))
    }

    return (
        <>
            {data.map((item) => (
                <tr
                    key={item.id}
                    onClick={() => handleRowClick && handleRowClick(item)}
                    className={`bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 ${dataType === 'plans' ? 'cursor-pointer' : ''}`}
                >
                    <th
                        scope="row"
                        className="px-4 py-2 font-medium text-neutral-900 dark:text-white"
                    >
                        {item.name}
                    </th>
                    {properties.map((property, index) => {
                        const isExpanded =
                            expandedStates[item.id]?.[property] || false

                        // Support both formats. TODO: CLEAR UP DB
                        const tags = Array.isArray(item[property])
                            ? item[property]
                            : typeof item[property] === 'string'
                              ? item[property]
                                    .split(',')
                                    .map((tag) => tag.trim())
                              : []

                        return (
                            <td
                                key={index}
                                className={`px-4 py-2 ${property === 'description' ? 'max-w-52' : ''} ${property === 'tags' ? 'lg:min-w-64' : ''}`}
                            >
                                {(() => {
                                    switch (property) {
                                        case 'plan':
                                            return (
                                                <>
                                                    {sections.map((section) => (
                                                        <PlanOrderedList
                                                            key={section.key}
                                                            title={
                                                                section.title
                                                            }
                                                            items={
                                                                item.drills?.[
                                                                    section.key
                                                                ]
                                                            }
                                                        />
                                                    ))}
                                                </>
                                            )

                                        case 'description':
                                            return (
                                                <ExpandedText
                                                    isExpanded={isExpanded}
                                                    item={item}
                                                    property={property}
                                                    handleToggle={() =>
                                                        handleToggle(
                                                            property,
                                                            item.id
                                                        )
                                                    }
                                                />
                                            )

                                        case 'link':
                                            return item[property] ? (
                                                <a
                                                    href={item[property]}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-block"
                                                >
                                                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <IoMdPlay className="text-xs text-gray-600 ml-[3px]" />
                                                    </div>
                                                </a>
                                            ) : (
                                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
                                                    <IoMdPlay className="text-xs text-gray-400 ml-[3px]" />
                                                </div>
                                            )

                                        case 'tags': {
                                            const sortedTags = [...tags].sort(
                                                (a, b) => {
                                                    const tagA =
                                                        typeof a === 'object'
                                                            ? a.name
                                                            : a
                                                    const tagB =
                                                        typeof b === 'object'
                                                            ? b.name
                                                            : b
                                                    return tagA.localeCompare(
                                                        tagB
                                                    )
                                                }
                                            )
                                            return (
                                                <div className="flex flex-wrap max-w-40 gap-1">
                                                    {sortedTags.map(
                                                        (tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="lowercase"
                                                            >
                                                                {typeof tag ===
                                                                'object'
                                                                    ? tag.name
                                                                    : tag}{' '}
                                                                {/* Support both formats. TODO: CLEAR UP DB */}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            )
                                        }

                                        default:
                                            return item[property]
                                    }
                                })()}
                            </td>
                        )
                    })}

                    <td className="flex justify-between gap-4 px-4 py-2 text-right">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleEditClick(item)
                            }}
                            className={iconClasses}
                            disabled={false}
                            title="Edit"
                        >
                            <AiTwotoneEdit />
                        </button>
                        {dataType === 'plans' && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    copyPlan(item)
                                }}
                                className={iconClasses}
                                disabled={isDeleting}
                                title="Copy plan"
                            >
                                <AiTwotoneCopy />
                            </button>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleOpenModal(item)
                            }}
                            className={iconClasses}
                            disabled={isDeleting}
                            title="Delete"
                        >
                            <AiTwotoneDelete />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default TableRow
