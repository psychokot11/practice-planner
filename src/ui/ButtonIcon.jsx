function ButtonIcon({ children, disabled }) {
  return (
    <button disabled={disabled} className="bg-none border-none rounded-lg p-2 transition-all duration-100 ease-in hover:bg-neutral-50">
      {children}
    </button>
  );
}
export default ButtonIcon;