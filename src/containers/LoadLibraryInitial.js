import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import customBindActionCreators from '../lib/customBindActionCreators';

// Actions
import { loadLibraryAsync } from '../data/books/BooksActions';

// Components
import CenteredSpinner from '../components/CenteredSpinner';

// Used to preload library data to redux
class LoadLibraryInitial extends PureComponent {
	componentDidMount() {
		const { loadLibraryAsync } = this.props;
		loadLibraryAsync();
	}

	render() {
		const {
			initialized,
			children,
		} = this.props;
		if (!initialized) {
			return <CenteredSpinner />;
		}
		return children;
	}
}

LoadLibraryInitial.propTypes = {
	loadLibraryAsync: propTypes.func.isRequired,
	children: propTypes.node.isRequired,
	initialized: propTypes.bool.isRequired,
};

function mapStateToProps(state) {
	return {
		initialized: state.getIn(['books', 'initialized']),
	};
}

function mapDispatchToProps(dispatch) {
	return customBindActionCreators({
		loadLibraryAsync,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadLibraryInitial);
