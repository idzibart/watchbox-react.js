import style from "./MovieRate.module.css";

export function MovieRate({ movie, onClick }) {
  return (
    <>
      <img
        src={movie.Poster}
        alt={`Poster of ${movie.Title}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/notavailable.jpg";
        }}
      />
      <div className={style.data}>
        <h4>{movie.Title}</h4>
        <div className={style.info}>
          <p>⭐ {movie.imdbRating}</p>
          <p>⏱ {movie.Runtime}</p>
          <button className={style.btn}
            onClick={() => onClick(movie.imdbID)}
          >
            ❌
          </button>
        </div>
      </div>
    </>
  );
}