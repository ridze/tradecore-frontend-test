import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import { addSubgenre, selectGenre, selectSubgenre } from '../../data/books/BooksActions';

// Constants
import { allSteps, STEP_IDS } from '../../lib/constants/addBookSteps';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper } from '../../components/Wrappers';

// Helpers
import { mapIdsToSteps } from '../../lib/helpers';

class BookInformation extends PureComponent {
	constructor(props) {
		super(props);
		const { isAddNewSubgenreSelected } = props;
		this.myStepsIds = [STEP_IDS.GENRE, STEP_IDS.SUBGENRE];
		const dependentStepsIds = isAddNewSubgenreSelected ? [STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION] : [STEP_IDS.INFORMATION];
		this.myStepsIds.push(...dependentStepsIds);
		this.activeStepIndex = isAddNewSubgenreSelected ? 3 : 2;
	}

	componentDidMount() {
		const {
			genres,
			match,
			selectGenre,
			selectSubgenre,
		} = this.props;
		const {
			genreId,
			subgenreId,
			isAddNewSubgenreSelected,
		} = match.params;
		const selectedGenreIndex = genres.findIndex(genre => genre.get('id') === Number(genreId));
		if (selectedGenreIndex !== - 1) {
			selectGenre(Number(genreId));
			const selectedGenre = genres.get(selectedGenreIndex);
			const selectedSubgenreIndex = selectedGenre.get('subgenres').findIndex(subgenre => subgenre.get('id') === Number(subgenreId));
			if (selectedSubgenreIndex !== -1) {
				this.setState({ initialized: true });
				console.log('isAddNewSubgenreSelected', isAddNewSubgenreSelected);
				if (!isAddNewSubgenreSelected) {
					selectSubgenre(Number(subgenreId));
				}
			} else {
				this.setState({
					initialized: true,
					error: true,
				});
			}
		} else {
			this.setState({
				initialized: true,
				error: true,
			});
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

	onSubmitButtonClick = () => {};

	render() {
		return (
			<div>
				<StepsIndicator
					steps={mapIdsToSteps(this.myStepsIds, allSteps)}
					activeStepIndex={this.activeStepIndex}
				/>
				<ContentWrapper>
					<ControlButtons
						onLeftButtonClick={this.onBackButtonClick}
						onRightButtonClick={this.onSubmitButtonClick}
						rightButtonText="Add"
						disabledRight={true}
					/>
				</ContentWrapper>
			</div>
		);
	}
}

BookInformation.propTypes = {
	selectGenre: PropTypes.func.isRequired,
	selectSubgenre: PropTypes.func.isRequired,
	selectedGenreId: PropTypes.number,
	selectedSubgenreId: PropTypes.number,
	isAddNewSubgenreSelected: PropTypes.bool,
};

BookInformation.defaultProps = {
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
		selectSubgenre,
		addSubgenre,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookInformation));
