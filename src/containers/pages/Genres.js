import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import { selectGenre } from '../../data/books/BooksActions';

// Constants
import {
	ALL_STEPS,
	STEP_IDS,
} from '../../lib/constants/BookData';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ItemButton from '../../components/ItemButton';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper } from '../../components/Wrappers';

// Helpers
import { mapIdsToSteps } from '../../lib/helpers';

class Genres extends PureComponent {
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

		this.state = { myStepsIds };
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			selectedGenreId,
			selectedSubgenreId,
			isAddNewSubgenreSelected,
		} = this.props;
		if (selectedSubgenreId && selectedSubgenreId !== prevProps.selectedSubgenreId) {
			this.setState({ myStepsIds: [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.INFORMATION] });
		} else if (isAddNewSubgenreSelected && isAddNewSubgenreSelected !== prevProps.isAddNewSubgenreSelected) {
			this.setState({ myStepsIds: [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION] });
		} else if (selectedGenreId !== prevProps.selectedGenreId) {
			this.setState({ myStepsIds: [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.PENDING] })
		}
	}

	onBackButtonClick = () => {
		const {
			history,
		} = this.props;
		history.push('/home');
	};

	onNextButtonClick = () => {
		const {
			history,
			selectedGenreId,
		} = this.props;
		history.push(`/genres/${selectedGenreId}/subgenres`);
	};

	render() {
		const {
			myStepsIds,
		} = this.state;

		const {
			genres,
			selectedGenreId,
			selectGenre,
		} = this.props;

		return (
			<Fragment>
				<StepsIndicator
					steps={mapIdsToSteps(myStepsIds, ALL_STEPS)}
					activeStepIndex={0}
				/>
				<ContentWrapper>
					<div>
						{genres.map(genre => (
							<ItemButton
								name={genre.get('name')}
								selected={selectedGenreId === genre.get('id')}
								onClick={() => selectGenre(genre.get('id'))}
								key={`${genre.get('id')}-${genre.get('name')}`}
							/>
						))}
					</div>
					<ControlButtons
						onLeftButtonClick={this.onBackButtonClick}
						onRightButtonClick={this.onNextButtonClick}
						disabledRight={!selectedGenreId}
					/>
				</ContentWrapper>
			</Fragment>
		);
	}
}

Genres.propTypes = {
	selectedGenreId: PropTypes.number,
	selectedSubgenreId: PropTypes.number,
	isAddNewSubgenreSelected: PropTypes.bool,
	selectGenre: PropTypes.func.isRequired,
};

Genres.defaultProps = {
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
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Genres));
