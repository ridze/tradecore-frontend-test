import styled from 'styled-components';

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 50px;
`;

export const CenteredWrapper = styled.div`
	width: 700px;
	height: 500px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
`;
