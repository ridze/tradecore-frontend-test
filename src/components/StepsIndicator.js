import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Antd from 'antd';

// Constants
import {
	STEP_STATUSES,
} from '../lib/constants/addBookSteps';

const {
	Steps,
} = Antd;

const {
	Step,
} = Steps;

const StepsIndicator = ({ steps, activeStepIndex }) => {
	const determineStatus = (index, activeStepIndex) => {
		if (index < activeStepIndex) {
			return STEP_STATUSES.FINISH;
		} else if (index === activeStepIndex) {
			return STEP_STATUSES.PROCESS
		}
		return STEP_STATUSES.WAIT;
	};

	return (
		<Steps
			labelPlacement="vertical"
		>
			{steps.map((step, index) => (
				<Step
					title={step.title}
					key={step.id}
					status={determineStatus(index, activeStepIndex)}
				/>
			))}
		</Steps>
	);
};

StepsIndicator.propTypes = {
	steps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	activeStepIndex: PropTypes.string.isRequired,
};

export default StepsIndicator;
