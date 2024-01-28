import { useEffect, useReducer, useState } from "react";
import { Navbar } from "./components/nav/Navbar";
import { Search } from "./components/nav/Search";
import { Main } from "./components/main/Main";
import { SearchList } from "./components/main/SearchList";
import { Box } from "./components/reusable/Box";
import { MovieInfo } from "./components/main/MovieInfo";
import { WantWatch } from "./components/main/WantWatch";
import { IsWatched } from "./components/main/IsWatched";
import { Logo } from "./components/nav/Logo";
import { Loader } from "./components/reusable/Loader";

const KEY = "fa12a022";

const initialState = {
  isLoading: false,
  isLoadingSingleMovie: false,
  title: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setIsLoading":
      return { ...state, isLoading: action.payload };
    case "setIsLoadingSingleMovie":
      return { ...state, isLoadingSingleMovie: action.payload };
    case "setTitle":
      return { ...state, title: action.payload };
    default:
      return state;
  }
}

export default function App() {
  // const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [singleMovie, setSingleMovie] = useState({});
  const [watched, setWatched] = useState([]);
  const [wantWatch, setWantWatch] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoadingSingleMovie, setIsLoadingSingleMovie] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.title.length >= 3) {
      dispatch({ type: "setIsLoading", payload: true });
      const search = setTimeout(() => {
        fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${state.title}`)
          .then((res) => res.json())
          .then((data) => setMovies(data.Search))
          .finally(() => dispatch({ type: "setIsLoading", payload: false }));
      }, 800);
      return () => clearTimeout(search);
    }
  }, [state.title]);

  useEffect(() => {
    if (selectedID) {
      dispatch({ type: "setIsLoadingSingleMovie", payload: true });
      fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`)
        .then((res) => res.json())
        .then((data) => setSingleMovie(data))
        .finally(() =>
          dispatch({ type: "setIsLoadingSingleMovie", payload: false })
        );
    }
  }, [selectedID]);

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleDeleteWantWatch(id) {
    setWantWatch((wantWatch) =>
      wantWatch.filter((movie) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search
          title={state.title}
          setTitle={(newTitle) =>
            dispatch({ type: "setTitle", payload: newTitle })
          }
        />
      </Navbar>
      <Main>
        <Box>
          {state.isLoading ? (
            <Loader />
          ) : (
            <SearchList
              movies={movies}
              selectedID={selectedID}
              setSelectedID={setSelectedID}
            />
          )}
        </Box>
        <Box>
          {state.isLoadingSingleMovie ? (
            <Loader />
          ) : (
            selectedID && (
              <MovieInfo
                selectedID={selectedID}
                singleMovie={singleMovie}
                setWatched={setWatched}
                watched={watched}
                setWantWatch={setWantWatch}
                wantWatch={wantWatch}
              />
            )
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
