import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Antd from 'antd';
import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import { selectGenre, selectSubgenre, selectAddNewSubgenre } from '../../data/books/BooksActions';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ItemButton from '../../components/ItemButton';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper } from '../../components/Wrappers';

// Helpers
import { determineCurrentSteps } from '../../lib/helpers';

// Antd components
const { message } = Antd;

class Subgenres extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectedGenreIndex: -1,
		};
	}

	componentDidMount() {
		const {
			history,
			match,
			genres,
			selectedGenreId,
			selectGenre,
		} = this.props;
		const {
			genreId,
		} = match.params;

		// Check if genre with genreId from params exist
		const selectedGenreIndex = genres.findIndex(genre => genre.get('id') === Number(genreId));
		if (selectedGenreIndex !== -1) {
			this.setState({ selectedGenreIndex });
			if (selectedGenreId !== Number(genreId)) {
				selectGenre(Number(genreId));
			}
		} else { // Wrong genreId
			message.error('Requested genre does not exist, please, select from existing ones.', 5);
			history.push('/genres');
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
			<Fragment>
				<StepsIndicator
					steps={determineCurrentSteps(selectedSubgenreId, isAddNewSubgenreSelected)}
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
			</Fragment>
		);
	}
}

Subgenres.propTypes = {
	match: PropTypes.shape({}).isRequired,
	history: PropTypes.shape({}).isRequired,
	genres: PropTypes.shape({}).isRequired,
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
