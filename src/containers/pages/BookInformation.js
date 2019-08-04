import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Antd from 'antd';

import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import {
	addSubgenre, selectGenre, selectSubgenre, addBook,
} from '../../data/books/BooksActions';

// Constants
import { allSteps, STEP_IDS } from '../../lib/constants/addBookSteps';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper } from '../../components/Wrappers';
import AddBookForm from '../../components/AddBookForm';

// Helpers
import { mapIdsToSteps } from '../../lib/helpers';

// Antd components
const { Input, message } = Antd;

class BookInformation extends PureComponent {
	constructor(props) {
		console.log('CONSTRUCTOR');
		super(props);
		const { isAddNewSubgenreSelected } = props;
		this.myStepsIds = [STEP_IDS.GENRE, STEP_IDS.SUBGENRE];
		const dependentStepsIds = isAddNewSubgenreSelected ? [STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION] : [STEP_IDS.INFORMATION];
		this.myStepsIds.push(...dependentStepsIds);
		this.activeStepIndex = isAddNewSubgenreSelected ? 3 : 2;

		this.state = {
			initialized: false,
			error: null,
		};
	}

	componentDidMount() {
		const {
			match,
			history,
			genres,
			selectGenre,
			selectSubgenre,
			selectedGenreId,
			isAddNewSubgenreSelected,
		} = this.props;
		const {
			genreId,
			subgenreId,
		} = match.params;

		// Check if genre with genreId from params exist
		const selectedGenreIndex = genres.findIndex(genre => genre.get('id') === Number(genreId));

		// Wrong genreId
		if (selectedGenreIndex === -1) {
			message.error('Requested genre does not exist, please, select from existing ones.', 5);
			history.push('/genres');
			return;
		} else if (selectedGenreIndex !== -1 && selectedGenreId !== Number(genreId)) { // If does and it is not yet selected (user refreshes, clicks link) select it
			selectGenre(Number(genreId));
		}

		// Check if subgenre with subgenreId from params exist
		const selectedGenre = genres.get(selectedGenreIndex);
		const selectedSubgenreIndex = selectedGenre.get('subgenres').findIndex(subgenre => subgenre.get('id') === Number(subgenreId));

		// Wrong subgenreId
		if (selectedSubgenreIndex === -1) {
			message.error('Requested subgenre does not exist, please, select from existing ones, or add new.', 5);
			history.push(`/genres/${genreId}/subgenres`);
			return;
		}

		if (selectedSubgenreIndex !== -1) {
			this.setState({ initialized: true });
			// check if subgenre wasn't added immediately before this page, in that case then just keep Add New Subgenre button selected
			if (!isAddNewSubgenreSelected) {
				selectSubgenre(Number(subgenreId));
			}
		}
	}

	onBackButtonClick = () => {
		const {
			history,
			selectedGenreId,
			isAddNewSubgenreSelected,
		} = this.props;
		const path = isAddNewSubgenreSelected ?
			`/genres/${selectedGenreId}/subgenres/add-subgenre`: `/genres/${selectedGenreId}/subgenres/`;
		history.push(path);
	};

	onFormItemChange = (event) => {
		console.log(event);
		console.log(event.target);
		console.log(event.target.value);
	};

	onSubmitButtonClick = () => {};

	isFormValid = () => {

	};

	render() {
		const {
			initialized,
			error,
		} = this.state;

		return (
			<div>
				<StepsIndicator
					steps={mapIdsToSteps(this.myStepsIds, allSteps)}
					activeStepIndex={this.activeStepIndex}
				/>
				{initialized && !error && (
					<ContentWrapper>
						<AddBookForm
							id="addBookForm"
							onFormItemChange={}
						/>
						<ControlButtons
							rightButtonForm="addBookForm"
							onLeftButtonClick={this.onBackButtonClick}
							onRightButtonClick={() => {}}
							rightButtonText="Add"
							disabledRight={this.isFormValid()}
						/>
					</ContentWrapper>
				)}
			</div>
		);
	}
}

BookInformation.propTypes = {
	selectGenre: PropTypes.func.isRequired,
	selectSubgenre: PropTypes.func.isRequired,
	selectedGenreId: PropTypes.number,
	isAddNewSubgenreSelected: PropTypes.bool,
};

BookInformation.defaultProps = {
	selectedGenreId: null,
	isAddNewSubgenreSelected: false,
};

function mapStateToProps(state) {
	return {
		genres: state.getIn(['books', 'data', 'genres']),
		selectedGenreId: state.getIn(['books', 'selectedGenreId']),
		isAddNewSubgenreSelected: state.getIn(['books', 'isAddNewSubgenreSelected']),
	};
}

function mapDispatchToProps(dispatch) {
	return customBindActionCreators({
		selectGenre,
		selectSubgenre,
		addSubgenre,
		addBook,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookInformation));
