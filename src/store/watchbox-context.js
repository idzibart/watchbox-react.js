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

  useEffect(() => {
    if (state.title.length >= 3) {
      dispatch({ type: "setIsLoading", payload: true });
      const search = setTimeout(() => {
        fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${state.title}`)
          .then((res) => res.json())
          .then((data) => dispatch({ type: "setMovies", payload: data.Search }))
          .finally(() => dispatch({ type: "setIsLoading", payload: false }));
      }, 800);
      return () => clearTimeout(search);
    }
  }, [state.title]);

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
