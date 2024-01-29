import { useAppState } from "../../store/watchbox-context";
import style from "./Search.module.css";

export function Search() {
  const { state, dispatch } = useAppState();

  const setSearchTitle = (newTitle) =>
    dispatch({ type: "setTitle", payload: newTitle });

  return (
    <input
      placeholder="Type movie or series title..."
      className={style.input}
      type="text"
      value={state.title}
      onChange={(e) => setSearchTitle(e.target.value)}
    />
  );
}
