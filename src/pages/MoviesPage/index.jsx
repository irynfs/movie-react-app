import React from 'react';

import Title from '../../components/Title';
import MoviesListSection from '../../components/MoviesListSection';
import MovieAPIClient from '../../lib/MovieAPIClient';

class MoviesPage extends React.Component {
  state = {
    genres: [],
  }

  componentDidMount() {
    MovieAPIClient.getGenres()
      .then(response => {
        this.setState({ genres: response.data.genres })
      });
  }

  render() {
    const { genres } = this.state;

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
}

export default MoviesPage;