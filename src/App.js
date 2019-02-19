import React, { Component } from 'react';
import Routes from './routes/Routes';
import * as BooksAPI from './api/BooksAPI';
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
        <Routes books={this.state.books} updateBooks={this.updateBooks} />
      </div>
    );
  }
}

export default App;
