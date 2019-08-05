import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

const {
	Step,
} = Steps;

const StepsIndicator = ({ steps, activeStepIndex }) => (
	<Steps
		labelPlacement="vertical"
		current={activeStepIndex}
	>
		{steps.map(step => (<Step title={step.title} key={step.id} />))}
	</Steps>
);

StepsIndicator.propTypes = {
	activeStepIndex: PropTypes.number.isRequired,
	steps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StepsIndicator;
