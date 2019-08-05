import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message }  from 'antd';

import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import {
	addSubgenre, selectGenre, selectSubgenre, setNewBookData, addBook, removeBookAddedFlag,
} from '../../data/books/BooksActions';

// Constants
import { ALL_STEPS, STEP_IDS, ADD_BOOK_FORM_KEYS } from '../../lib/constants/BookData';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import AddBookForm from '../../components/AddBookForm';
import ControlButtons from '../../components/ControlButtons';
import BookAddedSuccessfully from '../../components/BookAddedSuccessfully';
import { ContentWrapper } from '../../components/Wrappers';

// Helpers
import { mapIdsToSteps, bookAlreadyExists } from '../../lib/helpers';

class BookInformation extends PureComponent {
	constructor(props) {
		super(props);
		const { isAddNewSubgenreSelected } = props;
		this.myStepsIds = [STEP_IDS.GENRE, STEP_IDS.SUBGENRE];
		const dependentStepsIds = isAddNewSubgenreSelected ? [STEP_IDS.ADD_SUBGENRE, STEP_IDS.INFORMATION] : [STEP_IDS.INFORMATION];
		this.myStepsIds.push(...dependentStepsIds);
		this.activeStepIndex = isAddNewSubgenreSelected ? 3 : 2;

		this.state = {
			initialized: false,
			isDescriptionRequired: false,
			selectedGenreIndex: -1,
			selectedSubgenreIndex: -1,
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
			const isDescriptionRequired = genres.getIn([selectedGenreIndex, 'subgenres', selectedSubgenreIndex, 'isDescriptionRequired']);

			this.setState({
				initialized: true,
				isDescriptionRequired,
				selectedGenreIndex,
				selectedSubgenreIndex,
			});

			// Create item validator depending on is description required
			this.formItemValidator = (() => {
				const baseValidator = value => !!value;
				return isDescriptionRequired ? baseValidator : (value, key) => {
					return key === ADD_BOOK_FORM_KEYS.DESCRIPTION ? true : baseValidator(value);
				};
			})();

			// check if subgenre wasn't added immediately before this page, in that case just keep Add New Subgenre button selected
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

	onFormItemChange = (value, key) => {
		const {
			setNewBookData,
		} = this.props;
		setNewBookData(key, value);
	};

	addNewBook = () => {
		const {
			selectedGenreIndex,
			selectedSubgenreIndex,
		} = this.state;
		const {
			genres,
			newBook,
			addBook,
		} = this.props;

		const books = genres.getIn([selectedGenreIndex, 'subgenres', selectedSubgenreIndex, 'books']);
		if (bookAlreadyExists(books, newBook)) {
			return message.info('Book with same title and by same author already exists.', 5);
		}
		addBook(selectedGenreIndex, selectedSubgenreIndex, newBook);
	};

	isFormValid = () => {
		const {
			newBook,
		} = this.props;
		const [...keys] = newBook.keys();
		return keys.reduce((acc, key, index) => {
			if (!this.formItemValidator(newBook.get(key), key)) {
				acc = false;
				keys.splice(0, index + 1); // exit loop
			}
			return acc;
		}, true);
	};

	redirectToGenres = () => {
		const {
			history,
		} = this.props;
		history.push('/genres');
	};

	render() {
		const {
			initialized,
			isDescriptionRequired,
		} = this.state;

		const {
			newBook,
			bookAddedSuccessfully,
			removeBookAddedFlag,
		} = this.props;

		if (bookAddedSuccessfully) {
			return (
				<BookAddedSuccessfully
					onUnmount={removeBookAddedFlag}
					onAddAnotherBook={this.redirectToGenres}
				/>
			);
		}

		return (
			<Fragment>
				<StepsIndicator
					steps={mapIdsToSteps(this.myStepsIds, ALL_STEPS)}
					activeStepIndex={this.activeStepIndex}
				/>
				{initialized && (
					<ContentWrapper>
						<AddBookForm
							id="addBookForm"
							isDescriptionRequired={isDescriptionRequired}
							newBook={newBook}
							onFormItemChange={this.onFormItemChange}
							onSubmit={this.addNewBook}
						/>
						<ControlButtons
							rightButtonForm="addBookForm"
							onLeftButtonClick={this.onBackButtonClick}
							onRightButtonClick={() => {}}
							rightButtonText="Add"
							disabledRight={!this.isFormValid()}
						/>
					</ContentWrapper>
				)}
			</Fragment>
		);
	}
}

BookInformation.propTypes = {
	selectGenre: PropTypes.func.isRequired,
	selectSubgenre: PropTypes.func.isRequired,
	removeBookAddedFlag: PropTypes.func.isRequired,
	selectedGenreId: PropTypes.number,
	isAddNewSubgenreSelected: PropTypes.bool,
	bookAddedSuccessfully: PropTypes.bool,
};

BookInformation.defaultProps = {
	selectedGenreId: null,
	isAddNewSubgenreSelected: false,
	bookAddedSuccessfully: null,
};

function mapStateToProps(state) {
	return {
		genres: state.getIn(['books', 'data', 'genres']),
		selectedGenreId: state.getIn(['books', 'selectedGenreId']),
		isAddNewSubgenreSelected: state.getIn(['books', 'isAddNewSubgenreSelected']),
		newBook: state.getIn(['books', 'newBook']),
		bookAddedSuccessfully: state.getIn(['books', 'bookAddedSuccessfully']),
	};
}

function mapDispatchToProps(dispatch) {
	return customBindActionCreators({
		selectGenre,
		selectSubgenre,
		addSubgenre,
		setNewBookData,
		addBook,
		removeBookAddedFlag,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookInformation));
