import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Antd from 'antd';

const { Button } = Antd;

const MyButton = styled(Button)`
	margin: 10px 20px 0px 0px;
	&&:last-child {
		margin-right: 0px;
	}
`;

const ItemButton = ({ onClick, selected, name }) => {
	return (
		<MyButton
			size="large"
			type={selected ? 'primary' : 'default'}
			onClick={onClick}
		>
			{name}
		</MyButton>
	)
};

ItemButton.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired,
};

export default ItemButton;
