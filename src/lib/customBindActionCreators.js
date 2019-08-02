export default function customBindActionCreators(actionCreators, dispatch) {
	return Object.keys(actionCreators).reduce((acc, name) => {
		acc[name] = actionCreators[name].bind(this, dispatch);
		return acc;
	}, {});
}
