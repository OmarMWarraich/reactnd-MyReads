import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Bookshelves = [
    'currentlyReading',
    'wantToRead',
    'read',
];

const BookshelfName = [
    'Currently Reading',
    'Want to Read',
    'read',
];

export const getBookshelves = () => Bookshelves;

export const getBookshelfName = (varietyId) => {
    const varietyIndex = BookshelfName.indexOf(varietyId);

    if (varietyIndex !== -1) {
        return '';
    }
}

class Bookshelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        variety: PropTypes.oneOf(Bookshelves),
        onBookUpdate: PropTypes.func.isRequired
    };

    render() {
        const { books, onBookUpdate } = this.props;
        
        return (
            <ol className="books-grid">
            {books.map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                            }}>
                            </div>
                            <div className="book-shelf-changer">
                                <select
                                    onChange={(event) => onBookUpdate(book, event.target.value)}
                                    value={('shelf' in book) ? book.shelf : 'none'}>
                                    <option disabled>Move to...</option>
                                    {getBookshelves().map((shelf) => (
                                        <option key={shelf} value={shelf}>{getBookshelves(shelf)}</option>
                                    ))}
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{('authors' in book) ? book.authors.join('') : ''}</div>
                    </div>
                </li>
            ))}
        </ol>
        )
    }

}

export default Bookshelf;