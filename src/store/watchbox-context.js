import { createContext, useReducer, useContext, useEffect } from "react";

const KEY = "fa12a022";

const initialState = {
  isLoading: false,
  isLoadingSingleMovie: false,
  title: "",
  movies: [],
  selectedID: null,
  singleMovie: {},
  watched: [],
  wantWatch: [],
};

const AppStateContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setIsLoading":
      return { ...state, isLoading: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    case "setIsLoadingSingleMovie":
      return { ...state, isLoadingSingleMovie: action.payload };
    case "setTitle":
      return { ...state, title: action.payload };
    case "setMovies":
      return { ...state, movies: action.payload };
    case "setSelectedID":
      return { ...state, selectedID: action.payload };
    case "setSingleMovie":
      return { ...state, singleMovie: action.payload };
    case "setWatched":
      return { ...state, watched: action.payload };
    case "setWantWatch":
      return { ...state, wantWatch: action.payload };
    default:
      return state;
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleCloseMovie() {
    dispatch({ type: "setSelectedID", payload: null });
  }

  useEffect(
    function () {
      const controller = new AbortController();

      // if (state.title.length >= 3)
      async function fetchMovies() {
        try {
          dispatch({ type: "setIsLoading", payload: true });
          dispatch({ type: "setError", payload: "" });
          const search = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${state.title}`,
            { signal: controller.signal }
          );

          if (!search.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await search.json();
          if (data.Response === "False") throw new Error("Movie not found");

          dispatch({ type: "setMovies", payload: data.Search });
          dispatch({ type: "setError", payload: "" });
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            dispatch({ type: "setError", payload: err.message });
          }
        } finally {
          dispatch({ type: "setIsLoading", payload: false });
        }
      }

      if (state.title.length < 3) {
        dispatch({ type: "setMovies", payload: [] });
        dispatch({ type: "setError", payload: "" });
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [state.title]
  );

  useEffect(() => {
    if (state.selectedID) {
      dispatch({ type: "setIsLoadingSingleMovie", payload: true });
      fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${state.selectedID}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "setSingleMovie", payload: data }))
        .finally(() =>
          dispatch({ type: "setIsLoadingSingleMovie", payload: false })
        );
    }
  }, [state.selectedID]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}
