export const mapIdsToSteps = (ids, allSteps) => ids.map(id => ({
	id,
	...allSteps[id],
}));

export const bookAlreadyExists = (books, newBook) => {
	if (!books) {
		return false;
	}
	const newBookIndex = books.findIndex(book => book.get('title') === newBook.get('title') && book.get('author') === newBook.get('author'));
	return newBookIndex !== -1;
};

export const subgenreAlreadyExists = (subgenres, newSubgenreName) => {
	const newSubgenreIndex = subgenres.findIndex(subgenre => subgenre.get('name') === newSubgenreName);
	if (newSubgenreIndex === -1) {
		return false;
	}
	return subgenres.get(newSubgenreIndex);
};
