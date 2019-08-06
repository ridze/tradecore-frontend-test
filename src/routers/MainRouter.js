import React from 'react';
import {
	Switch, Route, withRouter, Redirect,
} from 'react-router-dom';

// Layouts
import MainLayout from '../containers/layouts/MainLayout';

// Routers
import AddBookRouter from './AddBookRouter';

// Components
import { SmallHeader } from '../components/Text';

const MainRouter = () => (
	<MainLayout>
		<Switch>
			<Route
				exact
				path="/"
				render={() => (<SmallHeader>Home</SmallHeader>)}
			/>
			<Route
				path="/genres"
				component={AddBookRouter}
			/>
			<Redirect to="/genres" />
		</Switch>
	</MainLayout>
);

export default withRouter(MainRouter);
