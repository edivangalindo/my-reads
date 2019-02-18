import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import { PropTypes } from 'prop-types';
import * as BooksAPI from '../api/BooksAPI';

class Search extends Component {
    state = {
        Books: [],
        query: ''
    };

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    };

    handleChange = event => {
        const value = event.target.value;
        this.setState({ query: value });
        this.searchBooks(value);
    };

    changeBookShelf = books => {
        debugger;
        let allBooks = this.props.books;

        for (let book of books) {
            book.shelf = 'none';
        }

        for (let book of books) {
            for (let b of allBooks) {
                if (b.id === book.id) {
                    book.shelf = b.shelf;
                }
            }
        }
        return books;
    };

    searchBooks = value => {
        if (value.length !== 0) {
            BooksAPI.search(value, 10).then(books => {
                if (books.length > 0) {
                    books = books.filter(book => book.imageLinks);
                    books = this.changeBookShelf(books);
                    this.setState({ Books: books });
                }
            });
        } else {
            this.setState({ Books: [], query: '' });
        }
    };

    addBook = (book, shelf) => this.props.onChange(book, shelf);

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.query.length > 0 &&
                            this.state.Books.map((book, index) => (
                                <Book
                                    book={book}
                                    key={index}
                                    update={shelf => {
                                        this.addBook(book, shelf);
                                    }}
                                />
                            ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
