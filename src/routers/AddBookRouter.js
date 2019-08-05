import React, { PureComponent } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// Layouts
import AddBookLayout from '../containers/layouts/AddBookLayout';

// Pages
import Genres from '../containers/pages/Genres';
import Subgenres from '../containers/pages/Subgenres';
import AddSubgenre from '../containers/pages/AddSubgenre';
import BookInformation from '../containers/pages/BookInformation';

const withAddBookLayout = (component) => (
	<AddBookLayout>
		{component}
	</AddBookLayout>
);

class AddBookRouter extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			initialized: false,
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			history,
			match,
		} = this.props;

		console.log(history);
	}

	componentDidMount() {
		const {
			history,
			match,
		} = this.props;

		console.log(match);
		this.setState({ initialized: true });
	}

	render() {
		const {
			initialized,
		} = this.state;

		if (!initialized) {
			return null;
		}

		return (
			<Switch>
				<Route
					exact
					path="/genres"
					render={() => withAddBookLayout(<Genres />)}
				/>
				<Route
					exact
					path="/genres/:genreId/subgenres"
					render={() => withAddBookLayout(<Subgenres />)}
				/>
				<Route
					exact
					path="/genres/:genreId/subgenres/add-subgenre"
					render={() => withAddBookLayout(<AddSubgenre />)}
				/>
				<Route
					exact
					path="/genres/:genreId/:subgenreId/add-book"
					render={() => withAddBookLayout(<BookInformation />)}
				/>
			</Switch>
		);
	}
}

export default withRouter(AddBookRouter);
