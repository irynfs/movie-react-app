import * as ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  genres: [],
  movies: [],
  totalPages: 0,
  isLoading: true,
  currentPage: 1,
  selectedGenres: [],
  selectedGenreIDs: '',
};

export const root = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_GENRES:
      return {
        ...state,
        genres: action.genres,
      };
    case ACTION_TYPES.FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload.movies,
        totalPages: action.payload.totalPages
      };
    case ACTION_TYPES.TOGGLE_SPINNER:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case ACTION_TYPES.CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    case ACTION_TYPES.SELECT_GENRES:
      return {
        ...state,
        selectedGenres: action.payload.selectedGenres,
        selectedGenreIDs: action.payload.selectedGenreIDs
      };

    default:
      return state;
  }
};
