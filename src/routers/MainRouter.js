import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

// Routers
import AddBookRouter from './AddBookRouter';

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
				path="/genres"
				component={AddBookRouter}
			/>
			<Redirect to="/home" />
		</Switch>
	);
};

export default withRouter(MainRouter);
