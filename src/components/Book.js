import React from 'react';
import { PropTypes } from 'prop-types';

const Book = props => {
  const changeBookShelf = event => props.update(event.target.value);
  const book = props.book;

  const getThumbnail = () => {
    if (book.imageLinks) return book.imageLinks.thumbnail;

    // Tentando tratar livros que não possuem thumbnail...
    return `http://via.placeholder.com/128x192?text=${encodeURIComponent(
      book.title.trim()
    )}`;
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${getThumbnail()}")`
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={changeBookShelf} value={book.shelf}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
};

export default Book;
