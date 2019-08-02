export default function customBindActionCreators(actionCreators, dispatch) {
	const result = {};
	const actionCreatorsNames = Object.keys(actionCreators);
	actionCreatorsNames.forEach(name => {
		result[name] = actionCreators[name](dispatch);
	});
	return result;
}
