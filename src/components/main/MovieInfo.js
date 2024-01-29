import style from "./MovieInfo.module.css";
import { Button } from "../reusable/Button";
import { useEffect, useState } from "react";
import { useAppState } from "../../store/watchbox-context";

export function MovieInfo() {
  const { state, dispatch } = useAppState();
  const [isInWatched, setIsInWatched] = useState(false);
  const [isInWantWatch, setIsInWantWatch] = useState(false);

  useEffect(() => {
    const foundInWatched = state.watched.some(
      (movie) => movie.imdbID === state.selectedID
    );
    const foundInWantWatch = state.wantWatch.some(
      (movie) => movie.imdbID === state.selectedID
    );
    setIsInWatched(foundInWatched);
    setIsInWantWatch(foundInWantWatch);
  }, [state.watched, state.wantWatch, state.selectedID]);

  const {
    imdbID: id,
    Title: selectedTitle,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = state.singleMovie;

  function handleAddWatched() {
    if (isInWatched) {
      const updatedWatched = state.watched.filter(
        (movie) => movie.imdbID !== state.selectedID
      );
      dispatch({ type: "setWatched", payload: updatedWatched });
      setIsInWatched(false);
    } else {
      const newWatchedMovie = {
        imdbID: state.selectedID,
        Title: selectedTitle,
        Poster: poster,
        imdbRating,
        Runtime: runtime,
      };
      dispatch({
        type: "setWatched",
        payload: [...state.watched, newWatchedMovie],
      });
      setIsInWatched(true);
    }
  }

  function handleAddWantWatch() {
    if (isInWantWatch) {
      const updatedWantWatch = state.wantWatch.filter(
        (movie) => movie.imdbID !== state.selectedID
      );
      dispatch({ type: "setWantWatch", payload: updatedWantWatch });
      setIsInWantWatch(false);
    } else {
      const newWantWatchMovie = {
        imdbID: state.selectedID,
        Title: selectedTitle,
        Poster: poster,
        imdbRating,
        Runtime: runtime,
      };
      dispatch({
        type: "setWantWatch",
        payload: [...state.wantWatch, newWantWatchMovie],
      });
      setIsInWantWatch(true);
    }
  }
  return (
    <>
      <header className={style.header}>
        <h2 className={style.title}>{selectedTitle}</h2>
      </header>
      <section className={style.moviebox}>
        <div className={style.img}>
          <img
            src={poster}
            alt={`Poster of ${selectedTitle}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/notavailable.jpg";
            }}
          />
        </div>
        <div className={style.infobox}>
          <div className={style.data}>
            <p>
              <span>Genre</span> {genre}
            </p>
            <p>
              <span>Runtime</span> {runtime}
            </p>
            <p>
              <span>Released</span> {released}
            </p>
            <p>
              <span>Director</span> {director}
            </p>
            <p>
              <span>Stars</span> {actors}
            </p>
            <p>
              <span>IMDB Rating</span> {imdbRating} ⭐
            </p>
          </div>
        </div>
      </section>
      <section className={style.description}>
        <div className={style.btn}>
          <Button onClick={handleAddWatched} isActive={isInWatched}>
            👁️‍🗨️ Watched list
          </Button>
          <Button onClick={handleAddWantWatch} isActive={isInWantWatch}>
            ➕ Want watch list
          </Button>
        </div>
        <p className={style.text}>
          <span>Description</span>
          {plot}
        </p>
        <a
          href={`https://www.imdb.com/title/${id}`}
          rel="noreferrer"
          target="_blank"
        >
          read more
        </a>
      </section>
    </>
  );
}
