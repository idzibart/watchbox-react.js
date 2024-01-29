import style from "./SearchList.module.css";
import customstyle from "../reusable/List.module.css";
import { List } from "../reusable/List";
import { Movie } from "./Movie";
import { useAppState } from "../../store/watchbox-context";

export function SearchList() {
  const { state, dispatch } = useAppState()

  function handleSelectMovie(selectedID) {
    dispatch({ type: "setSelectedID", payload: selectedID });
  }

  return (
    <ul className={style.list}>
      {state.movies?.map((movie) => (
        <List
          custom={customstyle.search}
          key={movie.imdbID}
          onClick={() => handleSelectMovie(movie.imdbID)}
        >
          <Movie movie={movie} />
        </List>
      ))}
    </ul>
  );
}
