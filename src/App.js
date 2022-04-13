import React from 'react';
import * as BooksAPI from './BooksAPI';
import Bookshelf, { getBookshelves, getBookshelfName } from './Bookshelf';
import './App.css';
import { Link, Route } from 'react-router-dom';

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
                      books={this.state.books.filter((book) => book.shelf === shelf)}
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
				<Route path='/search' render={({ history }) => (
					<div className="search-books">
						<div className="search-books-bar">
							<Link
								to='/'
								className="close-search"
							>Close</Link>
							<div className="search-books-input-wrapper">
								{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
								<input type="text" placeholder="Search by title or author"/>

							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid"></ol>
						</div>
					</div>
				)}/>
			</div>
		);
	}
}

export default BooksApp;
