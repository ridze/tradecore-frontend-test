import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

// Routers
import AddBookRouter from './AddBookRouter';

const MainRouter = () => {
	return (
		<Switch>
			<Route
				path="/genres"
				component={AddBookRouter}
			/>
			<Redirect to="/genres" />
		</Switch>
	);
};

export default withRouter(MainRouter);
