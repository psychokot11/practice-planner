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
