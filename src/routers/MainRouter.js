import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

// Routers
import GenresRouter from './GenresRouter';

// Pages
import Home from '../containers/pages/Home';

const MainRouter = () => {
	return (
		<Switch>
			<Route
				exact
				path="/home"
				component={Home}
			/>
			<Route
				exact
				path="/genres"
				component={GenresRouter}
			/>
			<Redirect to="/home" />
		</Switch>
	);
};

export default withRouter(MainRouter);
