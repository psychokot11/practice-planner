function Table({ columns, children }) {
    return (
        <div className="table-auto relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
                <thead className="text-xs text-neutral-700 uppercase bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-400">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} scope="col" className="px-4 py-2">
                                {column.name}
                            </th>
                        ))}
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
