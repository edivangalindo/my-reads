import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const BookList = props => {
    const books = props.books;

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf
                        books={books.filter(
                            book => book.shelf === 'currentlyReading'
                        )}
                        title="Currently Reading"
                        onChangeShelf={props.onChange}
                    />

                    <BookShelf
                        books={books.filter(book => book.shelf === 'read')}
                        title="Read"
                        onChangeShelf={props.onChange}
                    />
                    <BookShelf
                        books={books.filter(
                            book => book.shelf === 'wantToRead'
                        )}
                        title="Want to Read"
                        onChangeShelf={props.onChange}
                    />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default BookList;
