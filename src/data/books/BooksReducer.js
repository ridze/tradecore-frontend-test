import { fromJS } from 'immutable';
import BOOKS_TYPES from './BooksTypes';

const initialState = fromJS({

});

export default function booksReducer(state = initialState, action) {
	switch (action.type) {
	case BOOKS_TYPES.LOAD_LIBRARY: {
		console.log(action.payload);
		return fromJS(action.payload);
	}
	default: {
		return state;
	}
	}
}
