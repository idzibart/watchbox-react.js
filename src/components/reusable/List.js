import style from "./List.module.css";

export function List({ children, onClick, custom }) {
  return (
    <li onClick={onClick} className={`${style.list} ${custom}`}>
      {children}
    </li>
  );
}
