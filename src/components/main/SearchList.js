import style from "./SearchList.module.css";
import customstyle from '../reusable/List.module.css'
import { List } from "../reusable/List";
import { Movie } from "./Movie";

export function SearchList({ movies, setSelectedID }) {
  function handleSelectMovie(selectedID) {
    setSelectedID(selectedID);
  }

  return (
    <ul className={style.list}>
      {movies?.map((movie) => (
        <List custom={customstyle.search}
          key={movie.imdbID}
          onClick={() => handleSelectMovie(movie.imdbID)}
        >
          <Movie movie={movie} />
        </List>
      ))}
    </ul>
  );
}
