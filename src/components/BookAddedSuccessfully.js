import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Ant design components
import { Icon, Button } from 'antd';

// Components
import { CenteredWrapper } from './Wrappers';

// Component Specific
const Overlay = styled.div`
	position: fixed;
	width: ${`${window.innerWidth}px`};
	height: ${`${window.innerHeight}px`};
	z-index: 100;
`;

const GreatIcon = styled(Icon)`
	svg {
		width: 150px;
		height: 150px;
	}
`;

const GreyCaption = styled.h2`
	margin: 50px 0px 200px 0px;
	color: grey;
`;

const MyButton = styled(Button)`
	width: 350px;
`;

class BookAddedSuccessfully extends PureComponent {
	componentWillUnmount() {
		const {
			onUnmount,
		} = this.props;
		onUnmount();
	}

	render() {
		const {
			onAddAnotherBook,
		} = this.props;

		return (
			<Overlay>
				<CenteredWrapper>
					<GreatIcon type="check"/>
					<GreyCaption>Book Added Successfully!</GreyCaption>
					<MyButton
						onClick={onAddAnotherBook}
						type="primary"
						size="large"
					>
						Add another book
					</MyButton>
				</CenteredWrapper>
			</Overlay>
		);
	}
};

BookAddedSuccessfully.propTypes = {
	onAddAnotherBook: PropTypes.func.isRequired,
	onUnmount: PropTypes.func.isRequired,
};

export default BookAddedSuccessfully;
