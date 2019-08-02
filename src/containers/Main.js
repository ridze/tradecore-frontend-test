import React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import MainRouter from '../routers/MainRouter';
import LoadLibraryInitial from './HOC/LoadLibraryInitial';
import { store, history } from '../lib/store';

const TradecoreTestApp = () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<LoadLibraryInitial>
					<MainRouter />
				</LoadLibraryInitial>
			</ConnectedRouter>
		</Provider>
	);
};

export default TradecoreTestApp;
