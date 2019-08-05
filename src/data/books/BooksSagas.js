import { put, takeEvery, all } from 'redux-saga/effects';
import BOOKS_TYPES from './BooksTypes';
import libraryData from '../../lib/constants/LibraryData';

const simulateGetLibraryData = seconds => new Promise(resolve => setTimeout(() => resolve(libraryData), seconds * 1000));
const simulatePostRequest = (seconds, data) => new Promise(resolve => setTimeout(() => resolve(data), seconds * 1000));

function* loadLibraryAsync() {
	try {
		const myLibraryData = yield simulateGetLibraryData(1);
		yield put({
			type: BOOKS_TYPES.LOAD_LIBRARY,
			payload: myLibraryData,
		});
	} catch (error) {
		yield put({ type: BOOKS_TYPES.LOAD_LIBRARY_FAIL });
	}
}

function* addBookAsync(action) {
	try {
		const response = yield simulatePostRequest(1, action.payload);
		yield put({
			type: BOOKS_TYPES.ADD_BOOK,
			payload: response,
		});
	} catch (error) {
		yield put({ type: BOOKS_TYPES.ADD_BOOK_FAIL });
	}
}

function* watchLoadLibraryAsync() {
	yield takeEvery(BOOKS_TYPES.LOAD_LIBRARY_ASYNC, loadLibraryAsync);
}

function* watchAddBookAsync() {
	yield takeEvery(BOOKS_TYPES.ADD_BOOK_ASYNC, addBookAsync);
}

export default function* rootSaga() {
	yield all([
		watchLoadLibraryAsync(),
		watchAddBookAsync(),
	]);
}
