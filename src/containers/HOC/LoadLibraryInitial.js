import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import { loadLibrary } from '../../data/books/BooksActions';

class LoadLibraryInitial extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			mounted: false,
		};
	}

	componentDidMount() {
		const { loadLibrary } = this.props;
		loadLibrary();
	}

	render() {
		const { mounted } = this.state;
		const { children } = this.props;
		if (!mounted) {
			return null;
		}
		return children;
	}
}

LoadLibraryInitial.propTypes = {
	loadLibrary: propTypes.func.isRequired,
	children: propTypes.node.isRequired,
};

function mapDispatchToProps(dispatch) {
	return customBindActionCreators({
		loadLibrary,
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(LoadLibraryInitial);
