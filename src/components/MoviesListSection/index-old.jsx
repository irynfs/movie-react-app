import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import MoviesList from '../MoviesList';
import MovieAPIClient from '../../lib/MovieAPIClient';
import { extractGenreNames } from '../../lib/utils';


const MoviesListSection = (props) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		MovieAPIClient.getMoviesList()
			.then(response => {
				const { genres } = props;
				const movies = response.data.results.map(movie => {
					const genreNames = extractGenreNames(movie.genre_ids, genres);

					return {
						id: movie.id,
						title: movie.title,
						poster: movie.poster_path,
						releaseDate: movie.release_date,
						genres: genreNames,
					};
				});

				setMovies(movies);
			});
	}, []);

	return (
		<>
			<MoviesList
				movies={movies}
			/>
		</>
	);

}

export default MoviesListSection;