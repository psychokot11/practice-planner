import {
    IoMdClose,
    IoMdArrowDropdown,
    IoMdAddCircle,
    IoIosCopy,
} from 'react-icons/io'

const commonClasses =
    'py-2.5 px-5 text-sm font-medium rounded-lg shadow-lg duration-700'
const iconClasses = 'text-xl'

function Button({
    children,
    onClick,
    type,
    subtype = 'normal',
    disabled,
    center,
    fullWidth = false,
    flex,
    icon,
    iconPosition,
}) {
    const centerClasses = center ? 'items-center text-center' : 'text-left'
    const fullWidthClasses = fullWidth ? 'w-full' : 'w-fit'
    const flexClasses = flex ? 'flex justify-between items-center' : ''
    const classes = `${commonClasses} ${centerClasses} ${fullWidthClasses} ${flexClasses}`

    let buttonClasses

    if (subtype === 'accept') {
        buttonClasses = `${classes} text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`
    } else if (subtype === 'delete') {
        buttonClasses = `${classes} text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800`
    } else if (subtype === 'close') {
        buttonClasses =
            'text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white duration-700'
    } else if (subtype === 'solo-icon') {
        buttonClasses = `text-blue-500 hover:text-blue-600`
    } else {
        buttonClasses = `${classes} text-white bg-blue-500 font-semibold hover:bg-blue-600`
    }

    let iconElement

    if (icon === 'close') {
        iconElement = <IoMdClose className={iconClasses} />
    } else if (icon === 'dropdown') {
        iconElement = <IoMdArrowDropdown className={iconClasses} />
    } else if (icon === 'add') {
        iconElement = <IoMdAddCircle className={`${iconClasses} mr-2`} />
    } else if (icon === 'copy') {
        iconElement = <IoIosCopy className={iconClasses} />
    } else {
        iconElement = null
    }

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={buttonClasses}
        >
            {iconPosition === 'left' && iconElement}
            {children}
            {!iconPosition && iconElement}
        </button>
    )
}

export default Button
