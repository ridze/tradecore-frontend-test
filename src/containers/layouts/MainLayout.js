import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Layout specific components
const LayoutWrapper = styled.div`
	padding: 20px;
`;

const MainNavigation = styled.div`
	margin-bottom: 20px;
`;

const MainNavigationLink = styled(Link)`
	margin-right: 5px;
`;

const MainLayout = ({ children }) => (
	<LayoutWrapper>
		<MainNavigation>
			<MainNavigationLink href="/" to="/">Home</MainNavigationLink>
			<MainNavigationLink href="/" to="/genres">Genres</MainNavigationLink>
		</MainNavigation>
		{children}
	</LayoutWrapper>
);

MainLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default MainLayout;
