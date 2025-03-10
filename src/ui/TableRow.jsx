import { AiTwotoneDelete, AiTwotoneEdit, AiOutlineLink } from 'react-icons/ai'
import PlanOrderedList from '../features/plans/PlanOrderedList'
import { useState } from 'react'
import ExpandedText from './ExpandedText'

function TableRow({
    data,
    properties,
    handleEditClick,
    handleOpenModal,
    isDeleting,
    sections,
}) {
    const [expandedStates, setExpandedStates] = useState({})

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
                    className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600"
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

                        return (
                            <td key={index} className="px-4 py-2">
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

                                        default:
                                            return item[property]
                                    }
                                })()}
                            </td>
                        )
                    })}

                    <td className="flex justify-between gap-4 px-4 py-2 text-right">
                        <button
                            onClick={() => handleEditClick(item)}
                            className="font-medium hover:cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-400"
                            disabled={false}
                        >
                            <AiTwotoneEdit />
                        </button>
                        <button
                            onClick={() => handleOpenModal(item)}
                            className="font-medium hover:cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-400"
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
