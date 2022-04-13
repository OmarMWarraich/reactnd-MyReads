import React from 'react';
import * as BooksAPI from './BooksAPI';
import Bookshelf, { getBookshelves, getBookshelfName } from './Bookshelf';
import { Link, Route } from 'react-router-dom';
import Searchpage from '../Searchpage';
import sortBy from 'sort-by';
import './App.css';


class BooksApp extends React.Component {
  state = { books: [] };
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  bookUpdate = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;

        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }));
      });
    }
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (  
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {getBookshelves().map((shelf) =>(
                  <div key={shelf} className="bookshelf">
                    <h2 className="bookshelf-title">{getBookshelfName(shelf)}</h2>
                    <Bookshelf
                      books={this.state.books.filter((book) => book.shelf === shelf).sort(sortBy('title'))}
                      category={shelf}
                      onBookUpdate={this.bookUpdate}
                    />
                    </div>
                ))}
              </div>
            </div>
            <div className="open-search">
            <Link
								to='/search'
								className='add-books'
							>Add a book</Link>
						</div>
					</div>
				)}/>
				<Route path='/searchpage' render={({ history }) => (
          <Searchpage
            shelvesBooks={this.state.books}
            onBookUpdate={this.bookUpdate}
          />
				)}/>
			</div>
		);
	}
}

export default BooksApp;
