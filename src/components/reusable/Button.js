import style from "./Button.module.css";

export function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className={style.btn}>
      {children}
    </button>
  );
}
