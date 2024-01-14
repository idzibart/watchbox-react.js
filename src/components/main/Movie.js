import style from "./Movie.module.css";

export function Movie({ movie }) {
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
      <div>
        <h3>{movie.Title}</h3>
        <div className={style.data}>
          <p>📅 {movie.Year}</p>
          <p>🎥 {movie.Type}</p>
        </div>
      </div>
    </>
  );
}
