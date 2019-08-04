import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import { selectGenre, selectSubgenre, selectAddNewSubgenre } from '../../data/books/BooksActions';

// Constants
import { allSteps, STEP_IDS } from '../../lib/constants/addBookSteps';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ItemButton from '../../components/ItemButton';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper } from '../../components/Wrappers';

// Helpers
import { mapIdsToSteps } from '../../lib/helpers';

class Subgenres extends PureComponent {
	constructor(props) {
		super(props);

		const {
			isAddNewSubgenreSelected,
			selectedSubgenreId,
		} = props;

		let dependentStepsIds = [STEP_IDS.PENDING];
		const myStepsIds = [STEP_IDS.GENRE, STEP_IDS.SUBGENRE];

		if (isAddNewSubgenreSelected) {
			dependentStepsIds = [STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION];
		} else if (selectedSubgenreId) {
			dependentStepsIds = [STEP_IDS.INFORMATION];
		}

		myStepsIds.push(...dependentStepsIds);

		this.state = {
			myStepsIds,
			selectedGenreIndex: -1,
		};
	}

	componentDidMount() {
		const {
			genres,
			match,
			selectedGenreId,
			selectGenre,
		} = this.props;
		const {
			genreId,
		} = match.params;
		const selectedGenreIndex = genres.findIndex(genre => genre.get('id') === Number(genreId));
		this.setState({ selectedGenreIndex});
		if (selectedGenreId !== Number(genreId)) {
			selectGenre(Number(genreId));
		}
		// TODO show error if selectedGenreIndex === -1
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			selectedSubgenreId,
			isAddNewSubgenreSelected,
		} = this.props;
		if (selectedSubgenreId && selectedSubgenreId !== prevProps.selectedSubgenreId) {
			this.setState({ myStepsIds: [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.INFORMATION] });
		} else if (isAddNewSubgenreSelected && isAddNewSubgenreSelected !== prevProps.isAddNewSubgenreSelected) {
			this.setState({ myStepsIds: [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION] });
		}
	}

	onBackButtonClick = () => {
		const {
			history,
		} = this.props;
		history.push('/genres');
	};

	onNextButtonClick = () => {
		const {
			history,
			selectedGenreId,
			selectedSubgenreId,
			isAddNewSubgenreSelected,
		} = this.props;
		const path = isAddNewSubgenreSelected ? `/genres/${selectedGenreId}/subgenres/add-subgenre` : `/genres/${selectedGenreId}/${selectedSubgenreId}/add-book`;
		history.push(path);
	};

	render() {
		const {
			myStepsIds,
			selectedGenreIndex,
		} = this.state;
		const {
			genres,
			selectedSubgenreId,
			isAddNewSubgenreSelected,
			selectSubgenre,
			selectAddNewSubgenre,
		} = this.props;

		return (
			<div>
				<StepsIndicator
					steps={mapIdsToSteps(myStepsIds, allSteps)}
					activeStepIndex={1}
				/>
				{selectedGenreIndex !== -1 && (
					<ContentWrapper>
						<div>
							{genres.getIn([selectedGenreIndex, 'subgenres']).map(subgenre => (
								<ItemButton
									name={subgenre.get('name')}
									selected={selectedSubgenreId === subgenre.get('id')}
									onClick={() => selectSubgenre(subgenre.get('id'))}
									key={`${subgenre.get('id')}-${subgenre.get('name')}`}
								/>
							))}
							<ItemButton
								name="Add New"
								selected={isAddNewSubgenreSelected}
								onClick={selectAddNewSubgenre}
							/>
						</div>
						<ControlButtons
							onLeftButtonClick={this.onBackButtonClick}
							onRightButtonClick={this.onNextButtonClick}
							disabledRight={!(isAddNewSubgenreSelected || selectedSubgenreId)}
						/>
					</ContentWrapper>
				)}
			</div>
		);
	}
}

Subgenres.propTypes = {
	selectedGenreId: PropTypes.number,
	selectedSubgenreId: PropTypes.number,
	isAddNewSubgenreSelected: PropTypes.bool,
	selectSubgenre: PropTypes.func.isRequired,
};

Subgenres.defaultProps = {
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
		selectAddNewSubgenre,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subgenres));
