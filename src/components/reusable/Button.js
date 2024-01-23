import style from "./Button.module.css";


export function Button({ children, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`${style.btn} ${isActive ? style.active : ""}`}
    >
      {isActive ? "✅ Added" : children}
    </button>
  );
}
