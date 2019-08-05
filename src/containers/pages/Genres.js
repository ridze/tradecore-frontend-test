import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import { selectGenre } from '../../data/books/BooksActions';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import ItemButton from '../../components/ItemButton';
import ControlButtons from '../../components/ControlButtons';
import { ContentWrapper } from '../../components/Wrappers';

// Helpers
import { determineCurrentSteps } from '../../lib/helpers';

const Genres = (props) => {
	const onNextButtonClick = () => {
		const {
			history,
			selectedGenreId,
		} = props;
		history.push(`/genres/${selectedGenreId}/subgenres`);
	};

	const {
		genres,
		selectedGenreId,
		selectedSubgenreId,
		isAddNewSubgenreSelected,
		selectGenre,
	} = props;

	return (
		<Fragment>
			<StepsIndicator
				steps={determineCurrentSteps(selectedSubgenreId, isAddNewSubgenreSelected)}
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
					disabledLeft
					disabledRight={!selectedGenreId}
					onRightButtonClick={onNextButtonClick}
				/>
			</ContentWrapper>
		</Fragment>
	);
};

Genres.propTypes = {
	history: PropTypes.shape({}).isRequired,
	genres: PropTypes.shape({}).isRequired,
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
