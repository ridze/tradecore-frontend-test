/**
 * Binds dispatch to action creators
 * @param {object} actionCreators action creator functions from mapDispatchToProps in name: value pairs
 * @param {function} dispatch redux store dispatch function
 * @returns {object} action creator functions in name: value pairs bound with dispatch
 */
export default function customBindActionCreators(actionCreators, dispatch) {
	return Object.keys(actionCreators).reduce((acc, name) => {
		acc[name] = actionCreators[name].bind(this, dispatch);
		return acc;
	}, {});
}
