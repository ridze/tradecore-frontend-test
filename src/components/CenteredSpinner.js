import React from 'react';
import PropTypes from 'prop-types';

// Ant design components
import { Spin } from 'antd';

// Components
import { CenteredWrapper } from './Wrappers';

const CenteredSpinner = ({ tip }) => (
	<CenteredWrapper>
		<Spin size="large" tip={tip} />
	</CenteredWrapper>
);

CenteredSpinner.propTypes = {
	tip: PropTypes.string,
};

CenteredSpinner.defaultProps = {
	tip: '',
};

export default CenteredSpinner;
