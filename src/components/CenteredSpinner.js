import React from 'react';

// Ant design components
import { Spin } from 'antd';

// Components
import { CenteredWrapper } from './Wrappers';

const CenteredSpinner = () => {
	return (
		<CenteredWrapper>
			<Spin size="large" tip="Your Library is being loaded" />
		</CenteredWrapper>
	);
};

export default CenteredSpinner;
