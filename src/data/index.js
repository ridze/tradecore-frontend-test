import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

// Reducers
import booksReducer from './books/BooksReducer';

export default history => combineReducers({
	router: connectRouter(history),
	books: booksReducer,
});
