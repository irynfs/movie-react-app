import React from 'react';
import PropTypes from 'prop-types';

import MovieItem from '../MovieItem';
import styles from './styles.module.scss';

const MoviesList = props => {
		const { movies } = props;

		return (
			<section className={styles.list}>
				{movies.map(movie => <MovieItem key={movie.id} movie={movie}/>)}
			</section>
		);
}

MoviesList.propTypes = {
	movies: PropTypes.array,
};

export default MoviesList;