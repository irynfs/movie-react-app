import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Title from '../../components/Title';
import MoviesListSection from '../../components/MoviesListSection';
import { fetchGenres } from '../../actions/actionCreators';

const mapStateToProps = state => ({
  genres: state.genres
});

const mapDispatchToProps = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres())
});

const MoviesPage = props => {
  useEffect(() => {
    props.fetchGenres();
  }, []);

  return (
    <>
      <Title />

      {props.genres.length > 0 &&
        <MoviesListSection />
      }
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);
