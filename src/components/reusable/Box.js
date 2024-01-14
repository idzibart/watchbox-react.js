import style from "./Box.module.css";

export function Box({ children }) {
  return <div className={style.box}>{children}</div>;
}
