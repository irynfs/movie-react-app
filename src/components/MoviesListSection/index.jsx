import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

import GenreSelect from '../GenreSelect';
import MoviesList from '../MoviesList';
import Spinner from '../Spinner';
import {
	fetchMovies,
	changePage,
	selectGenres
} from '../../actions/actionCreators';

import styles from './styles.module.scss';

const mapStateToProps = state => ({
	totalPages: state.totalPages,
	isLoading: state.isLoading,
	currentPage: state.currentPage,
	selectedGenres: state.selectedGenres,
	selectedGenreIDs: state.selectedGenreIDs,
});

const mapDispatchToProps = dispatch => ({
	fetchMovies: (page, genreIDs) => dispatch(fetchMovies(page, genreIDs)),
	changePage: page => dispatch(changePage(page)),
	selectGenres: genres => dispatch(selectGenres(genres)),
});

const MoviesListSection = props => {
	useEffect(() => {
		props.fetchMovies(props.currentPage, props.selectedGenreIDs);
	}, [props.currentPage, props.selectedGenres]);

	const handlePageClick = (event, page) => {
		window.scrollTo(0, 0);
		props.changePage(page);
	};

	const handleSelectClick = (event) => {
		props.changePage(1);
		props.selectGenres(event.target.value);
	};

	if (props.isLoading) {
		return <Spinner />;
	}

	return (
		<section className={styles.section}>
			<GenreSelect
				onSelect={handleSelectClick}
			/>
			<MoviesList />
			<Pagination
				count={props.totalPages}
				page={props.currentPage}
				onChange={handlePageClick}
			/>
		</section>
	);
};

MoviesListSection.propTypes = {
	totalPages: PropTypes.number,
	isLoading: PropTypes.bool,
	currentPage: PropTypes.number,
	selectedGenres: PropTypes.array,
	selectedGenreIDs: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesListSection);
