import * as ACTION_TYPES from './actionTypes';
import MovieAPIClient from '../lib/MovieAPIClient';
import { prepareMovies } from '../lib/utils';

export const fetchGenres = () => {
  return dispatch => {
    MovieAPIClient.getGenres()
      .then(response => {
        dispatch({
          type: ACTION_TYPES.FETCH_GENRES,
          genres: response.data.genres
        });
      })
  };
};

export const fetchMovies = (page, genreIDs) => {
  return (dispatch, getState) => {
    dispatch(toggleSpinner(true));
    MovieAPIClient.getMovies(page, genreIDs)
      .then(response => {
        dispatch(toggleSpinner(false));
        const { genres } = getState();
        const movies = prepareMovies(response.data.results, genres);
        dispatch({
          type: ACTION_TYPES.FETCH_MOVIES,
          payload: {
            movies,
            totalPages: response.data.total_pages,
          }
        });
      })
  };
};

export const toggleSpinner = isLoading => {
  return {
    type: ACTION_TYPES.TOGGLE_SPINNER,
    isLoading
  }
};

export const changePage = page => {
  return {
    type: ACTION_TYPES.CHANGE_PAGE,
    page
  }
};

export const selectGenres = genres => {
  const selectedGenreIDs = genres.map(genre => genre.id).join();
  return {
    type: ACTION_TYPES.SELECT_GENRES,
    payload: {
      selectedGenres: genres,
      selectedGenreIDs
    }
  }
};
