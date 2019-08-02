import React from 'react';

// Constants
import {
	allSteps,
	STEP_IDS,
} from '../../lib/constants/addBookSteps';

// Components
import StepsIndicator from '../../components/StepsIndicator';

// Helpers
import { mapIdsToSteps } from '../../lib/helpers';

const myStepsIds = [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.PENDING];
const myActiveStep = STEP_IDS.GENRE;

const Genres = () => {
	return (
		<div>
			<StepsIndicator
				steps={mapIdsToSteps(myStepsIds, allSteps)}
				activeStepIndex={myActiveStep}
			/>
		</div>
	);
};

export default Genres;
