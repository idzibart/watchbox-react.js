import { List } from "../reusable/List";
import style from "./WantWatch.module.css";
import customStyle from "../reusable/List.module.css";
import { MovieRate } from "./MovieRate";
import { useAppState } from "../../store/watchbox-context";

export function WantWatch() {
  const { state, dispatch } = useAppState();

  const timeSum = state.wantWatch.reduce((totalMinutes, movie) => {
    const duration = parseInt(movie.Runtime, 10);
    return totalMinutes + duration;
  }, 0);

  const hours = Math.floor(timeSum / 60);
  const minutes = timeSum % 60;

  const handleDeleteWantWatch = (id) =>
    dispatch({
      type: "setWantWatch",
      payload: state.wantWatch.filter((movie) => movie.imdbID !== id),
    });

  return (
    <div className={style.list}>
      <header>
        <h3>➕ You want to watch</h3>
        <p>{state.wantWatch.length} movies</p>
        <p>{`${timeSum} minutes (${hours} h ${minutes} min)`}</p>
      </header>
      <ul>
        {state.wantWatch.map((movie) => (
          <List custom={customStyle.rate} key={movie.imdbID}>
            <MovieRate
              onClick={() => handleDeleteWantWatch(movie.imdbID)}
              movie={movie}
            />
          </List>
        ))}
      </ul>
    </div>
  );
}
