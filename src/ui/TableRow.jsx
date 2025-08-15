import { useState } from 'react'
import { useCopyPlan } from '../features/plans/useCopyPlan'
import {
    AiTwotoneDelete,
    AiTwotoneEdit,
    AiOutlineLink,
    AiTwotoneCopy,
} from 'react-icons/ai'
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
                    className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 cursor-pointer"
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
                            ? item[property].split(',').map((tag) => tag.trim())
                            : []

                        return (
                            <td key={index} className={`px-4 py-2 ${property === 'description' ? 'max-w-52' : ''} ${property === 'tags' ? 'lg:min-w-64' : ''}`}>
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
                                            return (
                                                item[property] && (
                                                    <a
                                                        href={item[property]}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <AiOutlineLink />
                                                    </a>
                                                )
                                            )

                                        case 'tags':
                                            const sortedTags = [...tags].sort((a, b) => {
                                                const tagA = typeof a === 'object' ? a.name : a;
                                                const tagB = typeof b === 'object' ? b.name : b;
                                                return tagA.localeCompare(tagB);
                                            });
                                            return (
                                                <div className="flex flex-wrap max-w-40 gap-2">
                                                    {sortedTags.map((tag, index) => (
                                                        <span key={index} className="lowercase">
                                                            {typeof tag ===
                                                            'object'
                                                                ? tag.name
                                                                : tag}{' '}
                                                            {/* Support both formats. TODO: CLEAR UP DB */}
                                                        </span>
                                                    ))}
                                                </div>
                                            )

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
