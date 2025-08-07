import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

function Table({ columns, children, onSort, sortColumn, sortDirection }) {
    return (
        <div className="table-auto relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
                <thead className="text-sm text-neutral-700 uppercase bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-400">
                    <tr>
                        {columns.map((column, index) => {
                            const columnKey = column.sortKey || column.name.toLowerCase().replace(/[^a-z0-9]/g, '')
                            const isActive = sortColumn === columnKey
                            
                            return (
                                <th key={index} scope="col" className={`${column.sortable ? "whitespace-nowrap" : "px-4 py-2 whitespace-nowrap"} ${column.className || ''}`}>
                                    {column.sortable ? (
                                        <button
                                            onClick={() => onSort(columnKey)}
                                            className="w-full h-full px-4 py-2 flex items-center gap-2 hover:text-neutral-900 dark:hover:text-neutral-200 uppercase text-left"
                                        >
                                            {column.name}
                                            <div className="flex flex-col ml-1">
                                                <HiChevronUp 
                                                    className={`${
                                                        isActive && sortDirection === 'asc' 
                                                            ? 'text-blue-600 dark:text-blue-400' 
                                                            : 'text-gray-400'
                                                    }`}
                                                    style={{ width: '1.25rem', height: '1.25rem' }}
                                                />
                                                <HiChevronDown 
                                                    className={`-mt-2 ${
                                                        isActive && sortDirection === 'desc' 
                                                            ? 'text-blue-600 dark:text-blue-400' 
                                                            : 'text-gray-400'
                                                    }`}
                                                    style={{ width: '1.25rem', height: '1.25rem' }}
                                                />
                                            </div>
                                        </button>
                                    ) : (
                                        column.name
                                    )}
                                </th>
                            )
                        })}
                        <th scope="col">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}

export default Table
