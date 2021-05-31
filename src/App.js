import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { root } from './reducers/root';
import MoviesPage from './pages/MoviesPage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  root,
  composeEnhancers(applyMiddleware(thunk))
);

const App = () => (
  <Provider store={store}>
    <MoviesPage />
  </Provider>
);

export default App;
