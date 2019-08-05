import React from 'react';
import {
	Switch, Route, Redirect, withRouter,
} from 'react-router-dom';

// Layouts
import AddBookLayout from '../containers/layouts/AddBookLayout';

// Pages
import Genres from '../containers/pages/Genres';
import Subgenres from '../containers/pages/Subgenres';
import AddSubgenre from '../containers/pages/AddSubgenre';
import BookInformation from '../containers/pages/BookInformation';

const AddBookRouter = () => (
	<AddBookLayout>
		<Switch>
			<Route
				exact
				path="/genres"
				component={Genres}
			/>
			<Route
				exact
				path="/genres/:genreId/subgenres"
				component={Subgenres}
			/>
			<Route
				exact
				path="/genres/:genreId/subgenres/add-subgenre"
				component={AddSubgenre}
			/>
			<Route
				exact
				path="/genres/:genreId/:subgenreId/add-book"
				component={BookInformation}
			/>
			<Redirect to="/genres" />
		</Switch>
	</AddBookLayout>
);

export default withRouter(AddBookRouter);
