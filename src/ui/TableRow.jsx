import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

function TableRow({ data, properties, handleEditClick, handleOpenModal, isDeleting }) {
    return (
        <>
            {data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              {properties.map((property, index) => (
                <td key={index} className="px-6 py-4">
                  {item[property]}
                </td>
              ))}
              <td className="flex justify-between gap-4 px-6 py-4 text-right">
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

export default TableRow;