import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// Pages
import Genres from '../containers/pages/Genres';
import Subgenres from '../containers/pages/Subgenres';
import AddSubgenre from '../containers/pages/AddSubgenre';
import BookInformation from '../containers/pages/BookInformation';

const MainRouter = () => {
	return (
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
				path="/genres/:genreId/add-subgenre"
				component={AddSubgenre}
			/>
			<Route
				exact
				path="/genres/:genreId/:subgenreId/add-book"
				component={BookInformation}
			/>
		</Switch>
	);
};

export default withRouter(MainRouter);
