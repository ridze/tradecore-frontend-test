import {
	createStore,
	applyMiddleware,
	compose,
} from 'redux';
import {
	routerMiddleware,
} from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import Immutable from 'immutable';

import reducers from '../data/index';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
// sagaMiddleware.run();

const middleware = [
	routerMiddleware(history),
	sagaMiddleware,
];

if (process.env.REACT_APP_IS_LOGGER_ACTIVE === 'true') {
	middleware.push(logger);
}

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
	reducers(history),
	Immutable.Map(),
	compose(
		applyMiddleware(...middleware)
	)
);


export default store;
