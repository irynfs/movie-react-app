import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

import GenreSelect from '../GenreSelect';
import MoviesList from '../MoviesList';
import Spinner from '../Spinner';
import MovieAPIClient from '../../lib/MovieAPIClient';
import { prepareMovies } from '../../lib/utils';

import styles from './styles.module.scss';

const MoviesListSection = props => {
	const [state, setState] = useState({
		movies: [],
		totalPages: 0,
		currentPage: 1,
		isLoading: true,
		selectedGenres: [],
		selectedGenreIDs: [],
	});

	useEffect(() => {
		MovieAPIClient.getMovies(state.currentPage, state.selectedGenreIDs)
			.then(response => {
				const movies = prepareMovies(response.data.results, props.genres);
				setState({
					...state,
					movies,
					isLoading: false,
					totalPages: response.data.total_pages,
				})
			})
	}, [state.currentPage, state.selectedGenres]);

	const handlePageClick = (event, page) => {
		window.scrollTo(0, 0);

		setState({
			...state,
			isLoading: true,
			currentPage: page
		});
	};

	const handleSelectClick = (event) => {
		const selectedGenreIDs = event.target.value.map(genre => genre.id).join();

		setState({
			...state,
			isLoading: true,
			currentPage: 1,
			selectedGenreIDs,
			selectedGenres: event.target.value,
		});
	};

	if (state.isLoading) {
		return <Spinner />;
	}

	return (
		<section className={styles.section}>
			<GenreSelect
				genres={props.genres}
				selectedGenres={state.selectedGenres}
				onSelect={handleSelectClick}
			/>
			{state.movies.length > 0 && <MoviesList movies={state.movies} />}
			{state.totalPages > 0 &&
				<Pagination
					count={state.totalPages}
					page={state.currentPage}
					onChange={handlePageClick}
				/>
			}
		</section>
	);
};

MoviesListSection.propTypes = {
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		})
	),
};

export default MoviesListSection;
