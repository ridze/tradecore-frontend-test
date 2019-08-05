import { put, takeEvery, all } from 'redux-saga/effects'
import BOOKS_TYPES from './BooksTypes';
import libraryData from '../../lib/constants/LibraryData';

const simulateGetLibraryData = (seconds) => new Promise(resolve => setTimeout(() => resolve(libraryData), seconds * 1000));

function* loadLibraryAsync() {
	try {
		const libraryData = yield simulateGetLibraryData(1);
		yield put({
			type: BOOKS_TYPES.LOAD_LIBRARY,
			payload: libraryData,
		});
	} catch (error) {
		yield put({ type: BOOKS_TYPES.LOAD_LIBRARY_FAIL });
	}
}

function* watchLoadLibraryAsync() {
	yield takeEvery(BOOKS_TYPES.LOAD_LIBRARY_ASYNC, loadLibraryAsync);
}

export default function* rootSaga() {
	yield all([
		watchLoadLibraryAsync(),
	]);
}
