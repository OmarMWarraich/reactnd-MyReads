import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';

class Searchpage extends Component {
	static propTypes = {
		shelvesBooks: PropTypes.array.isRequired,
		onBookUpdate: PropTypes.func.isRequired,
	};

	state = {
		books: [],
		query: ''
	};

	updateQuery = (query) => {

		
		if (!query) {
			this.setState({query: '', books: []});
			return;
		}

		query = query.trim();

		this.setState({query: query});

		BooksAPI.search(query).then((books) => {

			if(query !== this.state.query) return;

			if ('error' in books) {
				books = []
			}
			else {
				/*
				 * Since the search API didn't return the shelf property for a book this will compare with
				 * memory mapped books from the shelves to include the correct shelf attribute.
				 */
				books.map(book => (this.props.shelvesBooks.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)));
			}
			this.setState({books: books.sort(sortBy('title'))});
		});
	};

	render() {
		const onBookUpdate = this.props.onBookUpdate;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link
						to='/'
						className="close-search"
					>Close</Link>
					<div className="search-books-input-wrapper">
						<input
							className='search-books'
							type='text'
							placeholder="Search by title or author"
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<Bookshelf
						books={this.state.books}
						onUpdateBook={onBookUpdate}
					/>
				</div>
			</div>
		);
	};
}

export default Searchpage; 