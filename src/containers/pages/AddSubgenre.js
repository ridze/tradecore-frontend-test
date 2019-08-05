import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import {
	selectGenre, selectAddNewSubgenre, setNewSubgenreData, addSubgenre,
} from '../../data/books/BooksActions';

// Constants
import { ALL_STEPS, STEP_IDS } from '../../lib/constants/bookData';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper, CheckboxWrapper } from '../../components/Wrappers';

// Ant design components
import { Input, Checkbox, message } from 'antd';

// Helpers
import { mapIdsToSteps } from '../../lib/helpers';

const myStepsIds = [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION];

class AddSubgenre extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			initialized: false,
			error: false,
			selectedGenreIndex: null,
			name: '',
			isDescriptionRequired: false,
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

		if (selectedGenreIndex !== - 1) {
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
			addSubgenre,
			selectedGenreId,
			name,
			isDescriptionRequired,
		} = this.props;

		const id = Math.random() * Math.pow(10, 16);

		addSubgenre(selectedGenreIndex, name, isDescriptionRequired, id);
		history.push(`/genres/${selectedGenreId}/${id}/add-book`);
	};

	handleFieldChange = (key, value) => {
		const {
			setNewSubgenreData
		} = this.props;
		setNewSubgenreData(key, value);
	};

	render() {
		const {
			initialized,
		} = this.state;

		const {
			name,
			isDescriptionRequired,
		} = this.props;

		return (
			<div>
				<StepsIndicator
					steps={mapIdsToSteps(myStepsIds, ALL_STEPS)}
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
			</div>
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
		addSubgenre,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSubgenre));
