import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Antd from 'antd';

const { Button, Icon } = Antd;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 185px;
	margin-top: 50px;
	align-self: flex-end;
`;

const MyButton = styled(Button)`
	width: 85px;
`;

const ControlButtons = ({ onLeftButtonClick, onRightButtonClick, rightButtonText, leftButtonText, disabledRight, disabledLeft }) => {
	return (
		<Wrapper>
			<MyButton disabled={disabledLeft} onClick={onLeftButtonClick}>
				<Icon type="left" />
				{leftButtonText}
			</MyButton>
			<MyButton disabled={disabledRight} type="primary" onClick={onRightButtonClick}>
				{rightButtonText}
			</MyButton>
		</Wrapper>
	);
};

ControlButtons.propTypes = {
	leftButtonText: PropTypes.string,
	rightButtonText: PropTypes.string,
	onLeftButtonClick: PropTypes.func.isRequired,
	onRightButtonClick: PropTypes.func.isRequired,
	disabledLeft: PropTypes.bool,
	disabledRight: PropTypes.bool,
};

ControlButtons.defaultProps = {
	leftButtonText: 'Back',
	rightButtonText: 'Next',
	disabledLeft: false,
	disabledRight: false,
	onLeftButtonClick: null,
	onRightButtonClick: null,
};

export default ControlButtons;
