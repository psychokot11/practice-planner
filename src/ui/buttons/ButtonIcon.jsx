function ButtonIcon({ children, disabled, onClick, text }) {
  return (
    <button 
      disabled={disabled} 
      onClick={onClick}
      className="bg-none border-none rounded-lg p-2 transition-all duration-100 ease-in hover:bg-neutral-50 flex items-center gap-2"
    >
      <span className="pulse-scale">{children}</span>
      {text && <span className="hidden sm:inline text-neutral-700 font-bold">{text}</span>}
    </button>
  );
}
export default ButtonIcon;