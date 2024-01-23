import style from "./MovieInfo.module.css";
import { Button } from "../reusable/Button";
import { useEffect, useState } from "react";

export function MovieInfo({
  setWantWatch,
  wantWatch,
  setWatched,
  watched,
  singleMovie,
  selectedID,
}) {
  const [isInWatched, setIsInWatched] = useState(false);
  const [isInWantWatch, setIsInWantWatch] = useState(false);

  useEffect(() => {
    const foundInWatched = watched.some((movie) => movie.imdbID === selectedID);
    const foundInWantWatch = wantWatch.some(
      (movie) => movie.imdbID === selectedID
    );
    setIsInWatched(foundInWatched);
    setIsInWantWatch(foundInWantWatch);
  }, [watched, wantWatch, selectedID]);

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
  } = singleMovie;

  function handleAddWatched() {
    if (isInWatched) {
      const updatedWatched = watched.filter(
        (movie) => movie.imdbID !== selectedID
      );
      setWatched(updatedWatched);
      setIsInWatched(false);
    } else {
      const newWatchedMovie = {
        imdbID: selectedID,
        Title: selectedTitle,
        Poster: poster,
        imdbRating,
        Runtime: runtime,
      };
      setWatched([...watched, newWatchedMovie]);
      setIsInWatched(true);
    }
  }

  function handleAddWantWatch() {
    if (isInWantWatch) {
      const updatedWantWatch = wantWatch.filter(
        (movie) => movie.imdbID !== selectedID
      );
      setWantWatch(updatedWantWatch);
      setIsInWantWatch(false); //
    } else {
      const newWantWatchMovie = {
        imdbID: selectedID,
        Title: selectedTitle,
        Poster: poster,
        imdbRating,
        Runtime: runtime,
      };
      setWantWatch([...wantWatch, newWantWatchMovie]);
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
          <Button
            onClick={handleAddWatched}
          >
            👁️‍🗨️ Watched
          </Button>
          <Button
            onClick={handleAddWantWatch}
          >
            ➕ Want watch
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
