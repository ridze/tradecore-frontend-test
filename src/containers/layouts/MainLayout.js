import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import MainNavigation from '../../components/MainNavigation';

// Layout specific components
const LayoutWrapper = styled.div`
	padding: 20px;
`;

const MainLayout = ({ children }) => (
	<LayoutWrapper>
		<MainNavigation />
		{children}
	</LayoutWrapper>
);

MainLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default MainLayout;
