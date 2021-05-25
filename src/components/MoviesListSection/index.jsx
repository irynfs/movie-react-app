import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

import GenreSelect from '../GenreSelect';
import MoviesList from '../MoviesList';
import Spinner from '../Spinner';
import MovieAPIClient from '../../lib/MovieAPIClient';
import { extractGenreNames } from '../../lib/utils';

import styles from './styles.module.scss';

class MoviesListSection extends React.Component {
	state = {
		movies: [],
		totalPages: 0,
		currentPage: 1,
		isLoading: true,
		selectedGenres: [],
		selectedGenreIDs: [],
	};

	prepareMovies = response => {
		const { genres } = this.props;

		return response.data.results.map(movie => {
			const genreNames = extractGenreNames(movie.genre_ids, genres);
			return {
				id: movie.id,
				title: movie.title,
				poster: movie.poster_path,
				releaseDate: movie.release_date,
				genres: genreNames,
			};
		});
	};

	componentDidMount() {
		const { currentPage } = this.state;

		MovieAPIClient.getMovies(currentPage)
			.then(response => {
				const movies = this.prepareMovies(response);

				this.setState({
					movies,
					isLoading: false,
					totalPages: response.data.total_pages,
				})
			});
	}

	handlePageClick = (event, page) => {
		window.scrollTo(0, 0);
		const { selectedGenreIDs } = this.state;

		this.setState(
			{ isLoading: true },
			() => MovieAPIClient.getMovies(page, selectedGenreIDs)
				.then(response => {
					const movies = this.prepareMovies(response);

					this.setState({
						movies,
						isLoading: false,
						currentPage: page,
					})
				})
		);
	};

	handleSelectClick = (event) => {
		const selectedGenreIDs = event.target.value.map(genre => genre.id).join();

		this.setState({
			isLoading: true,
			currentPage: 1,
			selectedGenreIDs,
			selectedGenres: event.target.value,
		}, () => MovieAPIClient.getMovies(this.state.currentPage, selectedGenreIDs)
			.then(response => {
				const movies = this.prepareMovies(response);

				this.setState({
					movies,
					isLoading: false,
					totalPages: response.data.total_pages,
				})
			})
		);
	};

	render() {
		const {
			movies,
			currentPage,
			totalPages,
			isLoading,
			selectedGenres
		} = this.state;
		const { genres } = this.props;

		if (isLoading) {
			return <Spinner />;
		}

		return (
			<section className={styles.section}>
				<GenreSelect
					genres={genres}
					selectedGenres={selectedGenres}
					onSelect={this.handleSelectClick}
				/>
				{movies.length > 0 && <MoviesList movies={movies} />}
				{totalPages > 0 &&
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={this.handlePageClick}
					/>
				}
			</section>
		);
	}
}

MoviesListSection.propTypes = {
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		})
	),
};

export default MoviesListSection;
