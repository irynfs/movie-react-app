import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './styles.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const mapStateToProps = state => ({
  genres: state.genres,
	selectedGenres: state.selectedGenres
});

const GenreSelect = props => {
	const { genres, selectedGenres, onSelect } = props;

	return (
		<FormControl className={styles.formControl}>
			<InputLabel>Genre</InputLabel>
			<Select
				multiple
				value={selectedGenres}
				onChange={onSelect}
				input={<Input />}
				renderValue={(selected) => (
					<div className={styles.chips}>
						{selected.map((value) => (
							<Chip
								key={value.id}
								label={value.name}
								className={styles.chip}
							/>
						))}
					</div>
				)}
				MenuProps={MenuProps}
			>
				{genres.map(genre => (
					<MenuItem key={genre.id} value={genre}>
						{genre.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

GenreSelect.propTypes = {
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		})
	),
	selectedGenres: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		})
	),
	onSelect: PropTypes.func,
};

export default connect(mapStateToProps)(GenreSelect);
