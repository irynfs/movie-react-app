import React, { useEffect, useState } from 'react';

import Title from '../../components/Title';
import MoviesListSection from '../../components/MoviesListSection';
import MovieAPIClient from '../../lib/MovieAPIClient';

const MoviesPage = () => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    MovieAPIClient.getGenres()
      .then(response => setGenres(response.data.genres));
  }, []);

  return (
    <>
      <Title />

      {genres.length > 0 &&
        <MoviesListSection
          genres={genres}
        />
      }
    </>
  );
}

export default MoviesPage;