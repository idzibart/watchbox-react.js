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
import { ErrorMessage } from "./components/reusable/Error";

export default function App() {
  const { state } = useAppState();

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
      </Navbar>
      <Main>
        <Box>
          {state.isLoading && <Loader />}
          {!state.isLoading && !state.error && <SearchList />}
          {state.error && <ErrorMessage message={state.error} />}
        </Box>
        <Box>
          {state.isLoadingSingleMovie ? (
            <Loader />
          ) : (
            state.selectedID && <MovieInfo />
          )}
        </Box>
        <Box>
          <WantWatch />
          <IsWatched />
        </Box>
      </Main>
    </>
  );
}
