import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AddBookRouter from '../../routers/AddBookRouter';

class CheckParams extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			match,
		} = this.props;

		console.log(match);

		return <div />;
	}
}

export default withRouter(CheckParams);
