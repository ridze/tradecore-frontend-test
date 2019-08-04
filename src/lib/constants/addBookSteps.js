import React from 'react';

export const allSteps = {
	genre: {
		title: 'Genre',
	},
	subgenre: {
		title: 'Subgenre',
	},
	addSubgenre: {
		title: 'Add new Subgenre',
	},
	information: {
		title: 'Information',
	},
	pending: {
		title: '...',
		icon: (<span>...</span>),
	},
};

export const STEP_IDS = {
	GENRE: 'genre',
	SUBGENRE: 'subgenre',
	ADD_SUBGENRE: 'addSubgenre',
	INFORMATION: 'information',
	PENDING: 'pending',
};

export const STEP_STATUSES = {
	PROCESS: 'process',
	WAIT: 'wait',
	FINISH: 'finish',
	ERROR: 'error',
};
