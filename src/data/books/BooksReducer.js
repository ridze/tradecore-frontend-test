import { fromJS } from 'immutable';
import BOOKS_TYPES from './BooksTypes';

const initialState = fromJS({
	initialized: false,
	error: null,
	data: null,
	selectedGenreId: null,
	selectedSubgenreId: null,
	isAddNewSubgenreSelected: false,
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
			.set('selectedSubgenreId', null)
			.set('isAddNewSubgenreSelected', false);
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
	case BOOKS_TYPES.ADD_SUBGENRE: {
		const {
			selectedGenreIndex,
			name,
			isDescriptionRequired,
			id,
		} = action.payload;
		return state
			.set('selectedSubgenreId', id)
			.updateIn(['data', 'genres', selectedGenreIndex, 'subgenres'], subgenres => subgenres.push(fromJS({
				name,
				isDescriptionRequired,
				id,
			})));
	}
	default: {
		return state;
	}
	}
}
