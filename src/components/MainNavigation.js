import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';

const MainNavigationWrapper = styled.div`
	margin-bottom: 20px;
`;

const MainNavigationLink = styled(Link)`
	margin-right: 5px;
`;

const MainNavigation = () => (
	<MainNavigationWrapper>
		<MainNavigationLink href="/" to="/">Home</MainNavigationLink>
		<MainNavigationLink href="/" to="/genres">Genres</MainNavigationLink>
	</MainNavigationWrapper>
);

export default MainNavigation;
