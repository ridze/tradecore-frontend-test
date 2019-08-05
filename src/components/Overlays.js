import styled from 'styled-components';

export const BaseOverlay = styled.div`
	position: fixed;
	width: ${`${window.innerWidth}px`};
	height: ${`${window.innerHeight}px`};
	z-index: 100;
	left: 0;
    top: 0;
    background: white;
`;

export const SemiTransparentOverlay = styled(BaseOverlay)`
	background: rgba(255, 255, 255, 0.9);
`;
