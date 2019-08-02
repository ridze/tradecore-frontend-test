import { fromJS } from 'immutable';
import BOOKS_TYPES from './BooksTypes';

const initialState = fromJS({
	initialized: false,
	error: null,
	data: null,
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
	default: {
		return state;
	}
	}
}
