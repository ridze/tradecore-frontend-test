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

const ControlButtons = (props) => {
	const {
		onLeftButtonClick,
		onRightButtonClick,
		rightButtonText,
		leftButtonText,
		disabledRight,
		disabledLeft,
		rightButtonForm,
	} = props;

	return (
		<Wrapper>
			<MyButton disabled={disabledLeft} onClick={onLeftButtonClick}>
				<Icon type="left" />
				{leftButtonText}
			</MyButton>
			<MyButton
				disabled={disabledRight}
				type="primary"
				onClick={onRightButtonClick}
				form={rightButtonForm}
				htmlType={rightButtonForm && "submit"}
				key={rightButtonForm && "submit"}
			>
				{rightButtonText}
			</MyButton>
		</Wrapper>
	);
};

ControlButtons.propTypes = {
	rightButtonForm: PropTypes.string,
	leftButtonText: PropTypes.string,
	rightButtonText: PropTypes.string,
	onLeftButtonClick: PropTypes.func,
	onRightButtonClick: PropTypes.func,
	disabledLeft: PropTypes.bool,
	disabledRight: PropTypes.bool,
};

ControlButtons.defaultProps = {
	rightButtonForm: null,
	leftButtonText: 'Back',
	rightButtonText: 'Next',
	onLeftButtonClick: () => {},
	onRightButtonClick: () => {},
	disabledLeft: false,
	disabledRight: false,
};

export default ControlButtons;
