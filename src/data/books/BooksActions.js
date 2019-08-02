import BOOKS_TYPES from './BooksTypes';

export function loadLibrary(dispatch) {
	return () => dispatch({ type: BOOKS_TYPES.LOAD_LIBRARY_ASYNC });
}
