import { List } from "../reusable/List";
import style from "./IsWatched.module.css";
import { MovieRate } from "./MovieRate";
import customStyle from "../reusable/List.module.css";

export function IsWatched({ watched, handleDeleteWatched }) {
  const timeSum = watched.reduce((totalMinutes, movie) => {
    const duration = parseInt(movie.Runtime, 10);
    return totalMinutes + duration;
  }, 0);

  const hours = Math.floor(timeSum / 60);
  const minutes = timeSum % 60;

  return (
    <div className={style.list}>
      <header>
        <h3>👁️‍🗨️ You already watched</h3>
        <p>{watched.length} movies</p>
        <p>{`${timeSum} minutes (${hours} h ${minutes} min)`}</p>
      </header>
      <ul>
        {watched.map((movie) => (
          <List custom={customStyle.rate} key={movie.imdbID}>
            <MovieRate onClick={handleDeleteWatched} movie={movie} />
          </List>
        ))}
      </ul>
    </div>
  );
}
