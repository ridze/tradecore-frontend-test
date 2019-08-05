import { fromJS, List } from 'immutable';
import BOOKS_TYPES from './BooksTypes';

const initialState = fromJS({
	initialized: false,
	error: null,
	data: null,
	selectedGenreId: null,
	selectedSubgenreId: null,
	isAddNewSubgenreSelected: false,
	newSubgenre: {
		name: '',
		isDescriptionRequired: false,
	},
	newBook: {
		title: '',
		author: '',
		isbn: '',
		publisher: '',
		datePublished: '',
		numberOfPages: '',
		format: '',
		edition: '',
		editionLanguage: '',
		description: '',
	},
});

export default function booksReducer(state = initialState, action) {
	switch (action.type) {
	case BOOKS_TYPES.LOAD_LIBRARY: {
		return state
			.set('data', fromJS(action.payload))
			.set('initialized', true);
	}
	case BOOKS_TYPES.LOAD_LIBRARY_FAIL: {
		return state.set('error', fromJS(action.payload));
	}
	case BOOKS_TYPES.SELECT_GENRE: {
		return state
			.set('selectedGenreId', action.payload)
			.set('selectedSubgenreId', null);
	}
	case BOOKS_TYPES.SELECT_SUBGENRE: {
		return state
			.set('selectedSubgenreId', action.payload)
			.set('isAddNewSubgenreSelected', false);
	}
	case BOOKS_TYPES.SELECT_ADD_NEW_SUBGENRE: {
		return state
			.set('isAddNewSubgenreSelected', true)
			.set('selectedSubgenreId', null);
	}
	case BOOKS_TYPES.SET_NEW_SUBGENRE_DATA: {
		const {
			key,
			value,
		} = action.payload;
		return state.setIn(['newSubgenre', key], value);
	}
	case BOOKS_TYPES.RESET_NEW_SUBGENRE_DATA: {
		return state.set('newSubgenre', initialState.get('newSubgenre'));
	}
	case BOOKS_TYPES.ADD_SUBGENRE: {
		const {
			selectedGenreIndex,
			name,
			isDescriptionRequired,
			id,
		} = action.payload;
		return state.updateIn(['data', 'genres', selectedGenreIndex, 'subgenres'], subgenres => subgenres.push(fromJS({
				name,
				isDescriptionRequired,
				id,
			})));
	}
	case BOOKS_TYPES.SET_NEW_BOOK_DATA: {
		const {
			key,
			value,
		} = action.payload;
		return state.setIn(['newBook', key], value);
	}
	case BOOKS_TYPES.RESET_NEW_BOOK_DATA: {
		return state.set('newBook', initialState.get('newBook'));
	}
	case BOOKS_TYPES.ADD_BOOK: {
		const {
			selectedGenreIndex,
			selectedSubgenreIndex,
			book,
		} = action.payload;
		return state.updateIn(['data', 'genres', selectedGenreIndex, 'subgenres', selectedSubgenreIndex], (subgenre) => {
			return subgenre.get('books') ? subgenre.update('books', books => books.push(book)) : subgenre.set('books', List([book]));
		});
	}
	default: {
		return state;
	}
	}
}
