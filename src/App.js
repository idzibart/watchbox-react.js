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
import { useAppState } from "./store/watchbox-context";

export default function App() {
  const { state, dispatch } = useAppState();

  const setSearchTitle = (newTitle) =>
    dispatch({ type: "setTitle", payload: newTitle });

  const handleDeleteWatched = (id) =>
    dispatch({
      type: "setWatched",
      payload: state.watched.filter((movie) => movie.imdbID !== id),
    });

  const handleDeleteWantWatch = (id) =>
    dispatch({
      type: "setWantWatch",
      payload: state.wantWatch.filter((movie) => movie.imdbID !== id),
    });

  return (
    <>
      <Navbar>
        <Logo />
        <Search title={state.title} setTitle={setSearchTitle} />
      </Navbar>
      <Main>
        <Box>
          {state.isLoading ? (
            <Loader />
          ) : (
            <SearchList
              movies={state.movies}
              selectedID={state.selectedID}
              setSelectedID={(id) =>
                dispatch({ type: "setSelectedID", payload: id })
              }
            />
          )}
        </Box>
        <Box>
          {state.isLoadingSingleMovie && <Loader />}
          {state.selectedID && (
            <MovieInfo
              selectedID={state.selectedID}
              singleMovie={state.singleMovie}
              setWatched={(watched) =>
                dispatch({ type: "setWatched", payload: watched })
              }
              watched={state.watched}
              setWantWatch={(wantWatch) =>
                dispatch({ type: "setWantWatch", payload: wantWatch })
              }
              wantWatch={state.wantWatch}
            />
          )}
        </Box>
        <Box>
          <WantWatch
            wantWatch={state.wantWatch}
            handleDeleteWantWatch={handleDeleteWantWatch}
            singleMovie={state.singleMovie}
          />
          <IsWatched
            watched={state.watched}
            handleDeleteWatched={handleDeleteWatched}
            singleMovie={state.singleMovie}
          />
        </Box>
      </Main>
    </>
  );
}
