import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieItem from '../MovieItem';
import styles from './styles.module.scss';

const mapStateToProps = state => ({
  movies: state.movies,
});

const MoviesList = props => {
		return (
			<section className={styles.list}>
				{props.movies.map(movie => <MovieItem key={movie.id} movie={movie}/>)}
			</section>
		);
}

MoviesList.propTypes = {
	movies: PropTypes.array,
};

export default connect(mapStateToProps)(MoviesList);