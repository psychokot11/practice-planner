import {
    IoMdClose,
    IoMdArrowDropdown,
    IoMdAddCircle,
    IoIosCopy,
    IoMdArrowRoundForward,
    IoMdPlay,
} from 'react-icons/io'

const commonClasses =
    'py-2.5 px-5 text-sm font-medium rounded-lg shadow-lg duration-700'

function Button({
    children,
    onClick,
    type,
    subtype = 'normal',
    disabled,
    align = 'center',
    fullWidth = false,
    flex,
    icon,
    iconPosition,
    isOpen,
}) {
    let alignClasses
    
    if (align === 'left') {
        alignClasses = 'text-left'
    } else if (align === 'right') {
        alignClasses = 'text-right'
    } else {
        alignClasses = 'items-center text-center'
    }
    
    const fullWidthClasses = fullWidth ? 'w-full' : 'w-fit'
    const flexClasses = flex ? 'flex justify-between items-center' : ''
    const iconClasses = `text-xl ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`
    const classes = `${commonClasses} ${alignClasses} ${fullWidthClasses} ${flexClasses}`

    let buttonClasses

    if (subtype === 'primary') {
        buttonClasses = `${classes} text-white bg-blue-500 font-semibold hover:bg-blue-600`
    } else if (subtype === 'secondary') {
        // Placeholder for secondary button styling
        buttonClasses = `${classes} text-gray-900 bg-gray-200 font-semibold hover:bg-gray-300`
    } else if (subtype === 'tertiary') {
        buttonClasses = `text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center ${alignClasses} ${flexClasses}`
    } else if (subtype === 'accept') {
        buttonClasses = `${classes} text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`
    } else if (subtype === 'delete') {
        buttonClasses = `${classes} text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800`
    } else if (subtype === 'close') {
        buttonClasses =
            'text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white duration-700'
    } else if (subtype === 'solo-icon') {
        buttonClasses = `text-blue-500 hover:text-blue-600`
    } else if (subtype === 'dropdown') {
        buttonClasses = `flex items-center justify-between w-[250px] bg-white border border-gray-200 text-gray-900 text-sm font-medium px-3 py-2 hover:bg-gray-50 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`
    } else {
        buttonClasses = `${classes} text-white bg-blue-500 font-semibold hover:bg-blue-600`
    }

    let iconElement

    if (icon === 'close') {
        iconElement = <IoMdClose className={iconClasses} />
    } else if (icon === 'dropdown') {
        iconElement = <IoMdArrowDropdown className={`${iconClasses} ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    } else if (icon === 'add') {
        iconElement = <IoMdAddCircle className={`${iconClasses} mr-2`} />
    } else if (icon === 'copy') {
        iconElement = <IoIosCopy className={iconClasses} />
    } else if (icon === 'small-arrow') {
        iconElement = <IoMdArrowRoundForward className="text-sm ml-1 flex items-center" />
    } else if (icon === 'play') {
        iconElement = (
            <div className={`w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center ${iconClasses}`}>
                <IoMdPlay className="text-xs text-gray-600 ml-[3px]" />
            </div>
        )
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
