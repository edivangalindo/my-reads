import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './api/BooksAPI';
import BookList from './components/BookList';
import Search from './components/Search';
import NotFound from './components/NotFound';
import './assets/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks = () =>
    BooksAPI.getAll().then(books => this.setState({ books: books }));

  updateBooks = (book, shelf) =>
    BooksAPI.update(book, shelf).then(() => this.fetchAllBooks());

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BookList books={this.state.books} onChange={this.updateBooks} />
            )}
          />
          <Route
            exact
            path="/search"
            render={({ history }) => (
              <Search onChange={this.updateBooks} books={this.state.books} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
