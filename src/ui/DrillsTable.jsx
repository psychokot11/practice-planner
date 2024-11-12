import PropTypes from "prop-types";

function DrillsTable({ drills }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
        <thead className="text-xs text-neutral-700 uppercase bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Drill name
            </th>
            <th scope="col" className="px-6 py-3">
              Min. number of players
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Tags
            </th>
            <th scope="col" className="px-6 py-3">
              Link
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {drills.map((drill) => (
            <tr
              key={drill.id}
              className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
              >
                {drill.name}
              </th>
              <td className="px-6 py-4">{drill.minNumPlayers}</td>
              <td className="px-6 py-4">{drill.description}</td>
              <td className="px-6 py-4">{drill.tags}</td>
              <td className="px-6 py-4">
                {drill.link && <a href={drill.link}>link</a>}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:cursor-pointe disabled:cursor-not-allowed disabled:text-neutral-400"
                  disabled
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DrillsTable;

DrillsTable.propTypes = {
  drills: PropTypes.array.isRequired,
};
