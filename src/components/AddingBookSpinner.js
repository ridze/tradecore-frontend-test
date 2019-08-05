import React from 'react';

// Components
import CenteredSpinner from './CenteredSpinner';
import { SemiTransparentOverlay } from './Overlays';

const AddingBookSpinner = () => (
	<SemiTransparentOverlay>
		<CenteredSpinner tip="Your Book is being added." />
	</SemiTransparentOverlay>
);

export default AddingBookSpinner;
