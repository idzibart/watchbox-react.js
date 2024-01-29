import { List } from "../reusable/List";
import style from "./IsWatched.module.css";
import { MovieRate } from "./MovieRate";
import customStyle from "../reusable/List.module.css";
import { useAppState } from "../../store/watchbox-context";

export function IsWatched() {
  const { state, dispatch } = useAppState();

  const timeSum = state.watched.reduce((totalMinutes, movie) => {
    const duration = parseInt(movie.Runtime, 10);
    return totalMinutes + duration;
  }, 0);

  const hours = Math.floor(timeSum / 60);
  const minutes = timeSum % 60;

  const handleDeleteWatched = (id) =>
    dispatch({
      type: "setWatched",
      payload: state.watched.filter((movie) => movie.imdbID !== id),
    });

  return (
    <div className={style.list}>
      <header>
        <h3>👁️‍🗨️ You already watched</h3>
        <p>{state.watched.length} movies</p>
        <p>{`${timeSum} minutes (${hours} h ${minutes} min)`}</p>
      </header>
      <ul>
        {state.watched.map((movie) => (
          <List custom={customStyle.rate} key={movie.imdbID}>
            <MovieRate
              onClick={() => handleDeleteWatched(movie.imdbID)}
              movie={movie}
            />
          </List>
        ))}
      </ul>
    </div>
  );
}
