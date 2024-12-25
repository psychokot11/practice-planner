import PropTypes from "prop-types";

function ButtonTile({ children, onClick, disabled = false }) {
  return (
    <button
      className="flex-1 text-3xl font-medium text-neutral-700 bg-violet-400 border-4 border-violet-500 rounded-lg p-2 transition-all duration-100 ease-in py-10"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonTile;

ButtonTile.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(["red", "green", "blue", "yellow"]),
};
