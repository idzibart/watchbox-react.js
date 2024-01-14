import { useEffect, useState } from "react";
import { Navbar } from "./components/nav/Navbar";
import { Search } from "./components/nav/Search";
import { Main } from "./components/main/Main";
import { SearchList } from "./components/main/SearchList";
import { Box } from "./components/reusable/Box";
import { MovieInfo } from "./components/main/MovieInfo";
import { WantWatch } from "./components/main/WantWatch";
import { IsWatched } from "./components/main/IsWatched";
import { Logo } from "./components/nav/Logo";

const KEY = "fa12a022";

export default function App() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [singleMovie, setSingleMovie] = useState({});
  const [watched, setWatched] = useState([]);
  const [wantWatch, setWantWatch] = useState([]);

  useEffect(() => {
    if (title.length >= 3) {
      const search = setTimeout(() => {
        fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${title}`)
          .then((res) => res.json())
          .then((data) => setMovies(data.Search));
      }, 800);
      return () => clearTimeout(search);
    }
  }, [title]);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`)
      .then((res) => res.json())
      .then((data) => setSingleMovie(data));
  }, [selectedID]);

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleDeleteWantWatch(id) {
    setWantWatch((wantWatch) => wantWatch.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search title={title} setTitle={setTitle} />
      </Navbar>
      <Main>
        <Box>
          <SearchList
            movies={movies}
            selectedID={selectedID}
            setSelectedID={setSelectedID}
          />
        </Box>
        <Box>
          {selectedID ? (
            <MovieInfo
              selectedID={selectedID}
              singleMovie={singleMovie}
              setWatched={setWatched}
              watched={watched}
              setWantWatch={setWantWatch}
              wantWatch={wantWatch}
            />
          ) : (
            ""
          )}
        </Box>
        <Box>
          <WantWatch
            wantWatch={wantWatch}
            handleDeleteWantWatch={handleDeleteWantWatch}
            singleMovie={singleMovie}
          />
          <IsWatched
            watched={watched}
            handleDeleteWatched={handleDeleteWatched}
            singleMovie={singleMovie}
          />
        </Box>
      </Main>
    </>
  );
}
