import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import customBindActionCreators from '../../lib/customBindActionCreators';
import * as Antd from 'antd';

// Actions
import { selectGenre, selectAddNewSubgenre, addSubgenre } from '../../data/books/BooksActions';

// Constants
import { allSteps, STEP_IDS } from '../../lib/constants/addBookSteps';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper, CheckboxWrapper } from '../../components/Wrappers';

// Helpers
import { mapIdsToSteps } from '../../lib/helpers';

const myStepsIds = [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION];

// Antd components
const { Input, Checkbox, message } = Antd;

class AddSubgenre extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			initialized: false,
			error: false,
			selectedGenreIndex: -1,
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
			name,
			isDescriptionRequired,
		} = this.state;
		const {
			history,
			addSubgenre,
			selectedGenreId,
		} = this.props;

		const id = Math.random() * Math.pow(10, 16);

		addSubgenre(selectedGenreIndex, name, isDescriptionRequired, id);
		history.push(`/genres/${selectedGenreId}/${id}/add-book`);
	};

	handleNameChange = (event) => {
		const { value } = event.target;
		this.setState({ name: value });
	};

	handleIsDescRequiredChange = (event) => {
		const { checked } = event.target;
		this.setState({ isDescriptionRequired: checked });
	};

	render() {
		const {
			initialized,
			name,
			isDescriptionRequired,
		} = this.state;

		return (
			<div>
				<StepsIndicator
					steps={mapIdsToSteps(myStepsIds, allSteps)}
					activeStepIndex={2}
				/>
				{initialized && (
					<ContentWrapper>
						<Input
							value={name}
							onChange={this.handleNameChange}
							placeholder="Subgenre name"
						/>
						<CheckboxWrapper>
							<Checkbox checked={isDescriptionRequired} onChange={this.handleIsDescRequiredChange}>
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
	selectedGenreId: PropTypes.number,
	selectedSubgenreId: PropTypes.number,
	isAddNewSubgenreSelected: PropTypes.bool,
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
	};
}

function mapDispatchToProps(dispatch) {
	return customBindActionCreators({
		selectGenre,
		selectAddNewSubgenre,
		addSubgenre,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSubgenre));
