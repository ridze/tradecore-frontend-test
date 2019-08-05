import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import { SmallHeader } from '../../components/Text';

// Layout Specific components
const PageWrapper = styled.div`
	padding: 50px;
`;

const AddBookLayout = ({ children }) => (
	<Fragment>
		<SmallHeader>Add book - New book</SmallHeader>
		<PageWrapper>
			{children}
		</PageWrapper>
	</Fragment>
);

AddBookLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AddBookLayout;
