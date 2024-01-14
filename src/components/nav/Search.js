import style from './Search.module.css'

export function Search({ title, setTitle }) {
  return (
    <input
    placeholder='Type movie or series title...'
      className={style.input}
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
