/**
 * Maps ids of steps to their data
 * @param {array} ids
 * @param {array} allSteps
 * @returns {array}
 */
export const mapIdsToSteps = (ids, allSteps) => ids.map(id => ({
	id,
	...allSteps[id],
}));

/**
 * Checks if book exists with given list of books
 * @param {Immutable.List()} books
 * @param {Immutable.Map()} newBook
 * @returns {boolean}
 */
export const bookAlreadyExists = (books, newBook) => {
	if (!books) {
		return false;
	}
	const newBookIndex = books.findIndex(book => book.get('title') === newBook.get('title') && book.get('author') === newBook.get('author'));
	return newBookIndex !== -1;
};

/**
 * Checks if subgenre exists and returns it if does
 * @param {Immutable.List()} subgenres
 * @param {string} newSubgenreName
 * @returns {boolean|Immutable.map()}
 */
export const subgenreAlreadyExists = (subgenres, newSubgenreName) => {
	const newSubgenreIndex = subgenres.findIndex(subgenre => subgenre.get('name') === newSubgenreName);
	if (newSubgenreIndex === -1) {
		return false;
	}
	return subgenres.get(newSubgenreIndex);
};
