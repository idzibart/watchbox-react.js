import style from "./Error.module.css";

export function ErrorMessage({ message }) {
  return <p className={style.error}>⛔️ {message}</p>;
}
