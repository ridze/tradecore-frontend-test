import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
	padding: 20px;
`;

const AddBookLayout = ({ children }) => {
	return (
		<LayoutWrapper>
			<h3>Add book - New book</h3>
			{children}
		</LayoutWrapper>
	);
};

AddBookLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AddBookLayout;