import React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import MainRouter from '../routers/MainRouter';
import { store, history } from '../lib/store';

const TradecoreTestApp = () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<MainRouter />
			</ConnectedRouter>
		</Provider>
	);
};

export default TradecoreTestApp;
