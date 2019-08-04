import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';
import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import { selectGenre, selectAddNewSubgenre, addSubgenre } from '../../data/books/BooksActions';

// Constants
import { allSteps, STEP_IDS } from '../../lib/constants/addBookSteps';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper } from '../../components/Wrappers';

// Helpers
import { mapIdsToSteps } from '../../lib/helpers';

const myStepsIds = [STEP_IDS.GENRE, STEP_IDS.SUBGENRE, STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION];

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
			genres,
			match,
			selectGenre,
			selectAddNewSubgenre,
		} = this.props;
		const {
			genreId,
		} = match.params;
		const selectedGenreIndex = genres.findIndex(genre => genre.get('id') === Number(genreId));
		if (selectedGenreIndex !== - 1) {
			selectGenre(Number(genreId));
			selectAddNewSubgenre();
			this.setState({
				initialized: true,
				selectedGenreIndex,
			});
		} else {
			this.setState({
				initialized: true,
				error: true,
			});
			// TODO throw invalid genreId error / genre not exist
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

		const id = uuid();

		addSubgenre({
			selectedGenreIndex,
			name,
			isDescriptionRequired,
			id,
		});
		history.push(`/genres/${selectedGenreId}/${id}/add-book`);
	};

	render() {
		const {
			initialized,
			error,
			name,
		} = this.state;

		return (
			<div>
				<StepsIndicator
					steps={mapIdsToSteps(myStepsIds, allSteps)}
					activeStepIndex={2}
				/>
				<ContentWrapper>
					<ControlButtons
						onLeftButtonClick={this.onBackButtonClick}
						onRightButtonClick={this.onNextButtonClick}
						disabledRight={!name}
					/>
				</ContentWrapper>
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
