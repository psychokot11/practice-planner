function Tooltip({ children, message }) {
    return (
        <div className="cursor-pointer group relative flex max-w-max flex-col items-center justify-center">
            {children}
            <div className="absolute left-1/2 top-5 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-500 group-hover:scale-100">
                <div className="flex max-w-xs flex-col items-center shadow-lg">
                    <div className="clip-bottom h-3 w-3 bg-gray-800 rotate-45"></div>
                    <div className="rounded bg-gray-800 p-2 text-center text-xs text-white  -mt-2">
                        {message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tooltip
