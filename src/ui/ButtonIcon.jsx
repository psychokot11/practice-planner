import PropTypes from "prop-types";

function ButtonIcon({ children }) {
  return (
    <button className="bg-none border-none rounded-lg p-2 transition-all duration-100 ease-in hover:bg-neutral-50">
      {children}
    </button>
  );
}

ButtonIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonIcon;
