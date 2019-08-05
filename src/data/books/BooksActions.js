import BOOKS_TYPES from './BooksTypes';

export function loadLibraryAsync(dispatch) {
	dispatch({ type: BOOKS_TYPES.LOAD_LIBRARY_ASYNC });
}

export function selectGenre(dispatch, genreId) {
	dispatch({
		type: BOOKS_TYPES.SELECT_GENRE,
		payload: genreId,
	});
}

export function selectSubgenre(dispatch, subgenreId) {
	dispatch({
		type: BOOKS_TYPES.SELECT_SUBGENRE,
		payload: subgenreId,
	});
}

export function selectAddNewSubgenre(dispatch) {
	dispatch({ type: BOOKS_TYPES.SELECT_ADD_NEW_SUBGENRE });
}

export function setNewSubgenreData(dispatch, key, value) {
	dispatch({
		type: BOOKS_TYPES.SET_NEW_SUBGENRE_DATA,
		payload: {
			key,
			value,
		}
	});
}

export function resetNewSubgenreData(dispatch) {
	dispatch({ type: BOOKS_TYPES.RESET_NEW_SUBGENRE_DATA });
}

export function addSubgenre(dispatch, selectedGenreIndex, name, isDescriptionRequired, id) {
	dispatch({
		type: BOOKS_TYPES.ADD_SUBGENRE,
		payload: {
			selectedGenreIndex,
			name,
			isDescriptionRequired,
			id,
		},
	});
}

export function setNewBookData(dispatch, key, value) {
	dispatch({
		type: BOOKS_TYPES.SET_NEW_BOOK_DATA,
		payload: {
			key,
			value,
		}
	});
}

export function resetNewBookData(dispatch) {
	dispatch({ type: BOOKS_TYPES.RESET_NEW_BOOK_DATA })
}

export function addBook(dispatch, selectedGenreIndex, selectedSubgenreIndex, book) {
	dispatch({
		type: BOOKS_TYPES.ADD_BOOK,
		payload: {
			selectedGenreIndex,
			selectedSubgenreIndex,
			book,
		},
	});
}
