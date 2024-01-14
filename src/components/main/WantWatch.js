import { List } from "../reusable/List";
import style from "./WantWatch.module.css";
import customStyle from "../reusable/List.module.css";
import { MovieRate } from "./MovieRate";

export function WantWatch({ wantWatch, handleDeleteWantWatch }) {
  const timeSum = wantWatch.reduce((totalMinutes, movie) => {
    const duration = parseInt(movie.Runtime, 10);
    return totalMinutes + duration;
  }, 0);

  const hours = Math.floor(timeSum / 60);
  const minutes = timeSum % 60;

  return (
    <div className={style.list}>
      <header>
        <h3>➕ You want to watch</h3>
        <p>{wantWatch.length} movies</p>
        <p>{`${timeSum} minutes (${hours} h ${minutes} min)`}</p>
      </header>
      <ul>
        {wantWatch.map((movie) => (
          <List custom={customStyle.rate} key={movie.imdbID}>
            <MovieRate onClick={handleDeleteWantWatch} movie={movie} />
          </List>
        ))}
      </ul>
    </div>
  );
}
