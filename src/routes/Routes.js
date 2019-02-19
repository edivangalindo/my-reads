import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import BookList from '../components/BookList';
import Search from '../components/Search';
import NotFound from '../components/NotFound';

const Routes = props => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <BookList books={props.books} onChange={props.updateBooks} />
        )}
      />
      <Route
        exact
        path="/search"
        render={({ history }) => (
          <Search onChange={props.updateBooks} books={props.books} />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

Routes.propTypes = {
  books: PropTypes.array.isRequired,
  updateBooks: PropTypes.func.isRequired
};

export default Routes;
