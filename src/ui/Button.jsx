const commonClasses = `py-2.5 px-5 text-sm font-medium rounded-lg`;

function Button({ children, onClick, type, subtype = "normal", disabled, center, fullWidth, flex }) {
    const centerClasses = center ? "items-center text-center" : "text-left";
    const fullWidthClasses = fullWidth ? "w-full" : "";
    const flexClasses = flex ? "flex justify-between" : "";
    const classes = `${commonClasses} ${centerClasses} ${fullWidthClasses} ${flexClasses}`;
    
    let buttonClasses;

    if (subtype === "accept") {
        buttonClasses = `${classes} text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`;
    } else if (subtype === "delete") {
        buttonClasses = `${classes} text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800`;
    } else {
        buttonClasses = `${classes} text-white bg-blue-500 font-semibold hover:bg-blue-600`;
    };

    return (
        <button onClick={onClick} type={type} disabled={disabled} className={buttonClasses}>
            {children}
        </button>
    )
}

export default Button;