import style from './Navbar.module.css'

export function Navbar({ children }) {
  return <nav className={style.nav}>{children}</nav>;
}
