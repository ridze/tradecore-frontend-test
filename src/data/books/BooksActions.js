import BOOKS_TYPES from './BooksTypes';

export function loadLibraryAsync(dispatch) {
	dispatch({ type: BOOKS_TYPES.LOAD_LIBRARY_ASYNC });
}
