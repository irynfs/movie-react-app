export function extractGenreNames(genreIds, genres) {
	return genreIds.map(
		id => genres.find(
			genre => genre.id === id
		)
	).map(genre => genre.name);
}
