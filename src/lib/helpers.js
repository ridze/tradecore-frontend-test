export const mapIdsToSteps = (ids, allSteps) => ids.map(id => ({
	id,
	...allSteps[id],
}));
