import PropTypes from "prop-types";

const commonClasses = `py-2.5 px-5 text-sm font-medium rounded-lg`;

function Button({ children, onClick, type, subtype = "normal", disabled, center }) {
    const centerClasses = center ? "items-center text-center" : "text-left";
    
    let buttonClasses;

    if (subtype === "accept") {
        buttonClasses = `${commonClasses} ${centerClasses} text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`;
    } else if (subtype === "delete") {
        buttonClasses = `${commonClasses} ${centerClasses} text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800`;
    } else {
        buttonClasses = `${commonClasses} ${centerClasses} text-white bg-blue-500 font-semibold hover:bg-blue-600`;
    };

    return (
        <button onClick={onClick} type={type} disabled={disabled} className={buttonClasses}>
            {children}
        </button>
    )
}

export default Button;

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    subtype: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    center: PropTypes.bool
};