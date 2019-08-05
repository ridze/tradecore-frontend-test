import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import {
	selectGenre, selectAddNewSubgenre, setNewSubgenreData, resetNewSubgenreData, addSubgenre,
} from '../../data/books/BooksActions';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper } from '../../components/Wrappers';

// Ant design components
import { Input, Checkbox, message } from 'antd';

// Helpers
import { subgenreAlreadyExists, determineCurrentSteps } from '../../lib/helpers';

// Page Specific
const CheckboxWrapper = styled.div`
	padding: 20px 0px 10px 0px;
`;

class AddSubgenre extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			initialized: false,
			selectedGenreIndex: null,
		};
	}

	componentDidMount() {
		const {
			history,
			match,
			genres,
			selectGenre,
			selectAddNewSubgenre,
		} = this.props;
		const {
			genreId,
		} = match.params;

		// Check if genre with genreId from params exist
		const selectedGenreIndex = genres.findIndex(genre => genre.get('id') === Number(genreId));

		if (selectedGenreIndex !== -1) {
			selectGenre(Number(genreId));
			selectAddNewSubgenre();
			this.setState({
				initialized: true,
				selectedGenreIndex,
			});
		} else { // Wrong genreId
			message.error('Requested genre does not exist, please, select from existing ones.', 5);
			history.push('/genres');
		}
	}

	onBackButtonClick = () => {
		const {
			history,
			selectedGenreId,
		} = this.props;
		history.push(`/genres/${selectedGenreId}/subgenres`);
	};

	onNextButtonClick = () => {
		const {
			selectedGenreIndex,
		} = this.state;
		const {
			history,
			resetNewSubgenreData,
			addSubgenre,
			selectedGenreId,
			genres,
			name,
			isDescriptionRequired,
		} = this.props;

		// If subgenre exists return it, clear new subgenre data from redux, redirect to add book page with existing subgenry id
		const existingSubgenry = subgenreAlreadyExists(genres.getIn([selectedGenreIndex, 'subgenres']), name);
		const id = existingSubgenry ? existingSubgenry.get('id') : Math.random() * Math.pow(10, 16);

		if (existingSubgenry) {
			resetNewSubgenreData();
			message.info('Subgenre existed already.', 5);
		} else {
			addSubgenre(selectedGenreIndex, name, isDescriptionRequired, id);
			message.success('Added subgenre successfully.');
		}
		history.push(`/genres/${selectedGenreId}/${id}/add-book`);
	};

	handleFieldChange = (key, value) => {
		const {
			setNewSubgenreData,
		} = this.props;
		setNewSubgenreData(key, value);
	};

	render() {
		const {
			initialized,
		} = this.state;

		const {
			name,
			selectedSubgenreId,
			isAddNewSubgenreSelected,
			isDescriptionRequired,
		} = this.props;

		return (
			<Fragment>
				<StepsIndicator
					steps={determineCurrentSteps(selectedSubgenreId, isAddNewSubgenreSelected)}
					activeStepIndex={2}
				/>
				{initialized && (
					<ContentWrapper>
						<Input
							value={name}
							onChange={event => this.handleFieldChange('name', event.target.value)}
							placeholder="Subgenre name"
						/>
						<CheckboxWrapper>
							<Checkbox
								checked={isDescriptionRequired}
								onChange={event => this.handleFieldChange('isDescriptionRequired', event.target.checked)}
							>
								Description is required for this subgenre
							</Checkbox>
						</CheckboxWrapper>
						<ControlButtons
							onLeftButtonClick={this.onBackButtonClick}
							onRightButtonClick={this.onNextButtonClick}
							disabledRight={!name}
						/>
					</ContentWrapper>
				)}
			</Fragment>
		);
	}
}

AddSubgenre.propTypes = {
	selectGenre: PropTypes.func.isRequired,
	selectAddNewSubgenre: PropTypes.func.isRequired,
	setNewSubgenreData: PropTypes.func.isRequired,
	addSubgenre: PropTypes.func.isRequired,
	selectedGenreId: PropTypes.number,
	selectedSubgenreId: PropTypes.number,
	isAddNewSubgenreSelected: PropTypes.bool,
	name: PropTypes.string.isRequired,
	isDescriptionRequired: PropTypes.bool.isRequired,
};

AddSubgenre.defaultProps = {
	selectedGenreId: null,
	selectedSubgenreId: null,
	isAddNewSubgenreSelected: false,
};

function mapStateToProps(state) {
	return {
		genres: state.getIn(['books', 'data', 'genres']),
		selectedGenreId: state.getIn(['books', 'selectedGenreId']),
		selectedSubgenreId: state.getIn(['books', 'selectedSubgenreId']),
		isAddNewSubgenreSelected: state.getIn(['books', 'isAddNewSubgenreSelected']),
		name: state.getIn(['books', 'newSubgenre', 'name']),
		isDescriptionRequired: state.getIn(['books', 'newSubgenre', 'isDescriptionRequired']),
	};
}

function mapDispatchToProps(dispatch) {
	return customBindActionCreators({
		selectGenre,
		selectAddNewSubgenre,
		setNewSubgenreData,
		resetNewSubgenreData,
		addSubgenre,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSubgenre));
