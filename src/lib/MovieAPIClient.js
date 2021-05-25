import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e5cec3cc0c4f9e8ecf3063eb68a2cb81';
const MOVIE_API_URL = `${BASE_URL}discover/movie?api_key=${API_KEY}`;
const GENRE_API_URL = `${BASE_URL}genre/movie/list?api_key=${API_KEY}`;

export default class MovieAPIClient {
	static getMovies(page, genreIDs) {
		return axios.get(MOVIE_API_URL, {
			params: { page, with_genres: genreIDs }
		});
	}

	static getGenres() {
		return axios.get(GENRE_API_URL);
	}
}
