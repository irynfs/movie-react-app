export function extractGenreNames(genreIds, genres) {
	return genreIds.map(
		id => genres.find(
			genre => genre.id === id
		)
	).map(genre => genre.name);
}

export function prepareMovies(rawMovies, genres) {
	return rawMovies.map(movie => {
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