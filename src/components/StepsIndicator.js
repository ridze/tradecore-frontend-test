import React from 'react';
import PropTypes from 'prop-types';
import * as Antd from 'antd';

const {
	Steps,
} = Antd;

const {
	Step,
} = Steps;

const StepsIndicator = ({ steps, activeStepIndex }) => {
	return (
		<Steps
			labelPlacement="vertical"
			current={activeStepIndex}
		>
			{steps.map(step => (<Step title={step.title} key={step.id} />))}
		</Steps>
	);
};

StepsIndicator.propTypes = {
	activeStepIndex: PropTypes.number.isRequired,
	steps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StepsIndicator;
