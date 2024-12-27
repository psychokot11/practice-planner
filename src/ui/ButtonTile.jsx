import PropTypes from "prop-types";

function ButtonTile({ children, onClick, disabled = false }) {
  return (
    <button
      className="flex flex-col items-center gap-3 text-lg"
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
