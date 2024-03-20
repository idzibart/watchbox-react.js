import style from "./Box.module.css";

export function Box({ children, custom }) {
  return <div className={`${style.box} ${custom}`}>{children}</div>;
}
