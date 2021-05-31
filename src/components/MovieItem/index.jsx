import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import styles from './styles.module.scss';

const MovieItem = props => {
	const { movie: { title, poster, releaseDate, genres } } = props;

	return (
		<Paper className={styles.paper}>
			<Avatar
				className={styles.avatar}
				alt={poster}
				src={poster && `https://image.tmdb.org/t/p/w500${poster}`}
			/>
			<div className={styles.movieInfo}>
				<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
					{title}
				</Typography>
				<Typography variant="body2">
					{releaseDate}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{genres.join(', ')}
				</Typography>
			</div>
		</Paper>
	);
};

MovieItem.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string,
		poster: PropTypes.string,
		releaseDate: PropTypes.string,
		genres: PropTypes.arrayOf(PropTypes.string),
	})
};

export default MovieItem;