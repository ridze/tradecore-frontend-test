import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';

import customBindActionCreators from '../../lib/customBindActionCreators';

// Actions
import {
	addSubgenre, selectGenre, selectSubgenre, setNewBookData, addBookAsync, removeBookAddedFlag,
} from '../../data/books/BooksActions';

// Constants
import { ADD_BOOK_FORM_KEYS } from '../../lib/constants/BookData';

// Components
import StepsIndicator from '../../components/StepsIndicator';
import AddBookForm from '../../components/AddBookForm';
import ControlButtons from '../../components/ControlButtons';
import AddingBookSpinner from '../../components/AddingBookSpinner';
import BookAddedSuccessfully from '../../components/BookAddedSuccessfully';
import { ContentWrapper } from '../../components/Wrappers';

// Helpers
import { bookAlreadyExists, determineCurrentSteps } from '../../lib/helpers';

class BookInformation extends PureComponent {
	constructor(props) {
		super(props);
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
			actions,
			selectedGenreId,
			selectedSubgenreId,
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
		}

		// If does exist and it is not yet selected (user refreshes, clicks link) select it
		if (selectedGenreIndex !== -1 && selectedGenreId !== Number(genreId)) {
			actions.selectGenre(Number(genreId));
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

			// check if selectedSubgenreId is marked in redux (has page just loaded)
			// also check if subgenre wasn't added immediately before this page, in that case just keep Add New Subgenre button selected
			if (selectedSubgenreId !== Number(subgenreId) && !isAddNewSubgenreSelected) {
				actions.selectSubgenre(Number(subgenreId));
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
			`/genres/${selectedGenreId}/subgenres/add-subgenre` : `/genres/${selectedGenreId}/subgenres/`;
		history.push(path);
	};

	onFormItemChange = (value, key) => {
		const {
			actions,
		} = this.props;
		actions.setNewBookData(key, value);
	};

	addNewBook = () => {
		const {
			selectedGenreIndex,
			selectedSubgenreIndex,
		} = this.state;
		const {
			genres,
			newBook,
			actions,
		} = this.props;

		const books = genres.getIn([selectedGenreIndex, 'subgenres', selectedSubgenreIndex, 'books']);
		if (bookAlreadyExists(books, newBook)) {
			return message.info('Book with same title and by same author already exists.', 5);
		}
		return actions.addBookAsync(selectedGenreIndex, selectedSubgenreIndex, newBook);
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
			selectedSubgenreId,
			isAddNewSubgenreSelected,
			newBook,
			addingBookAsync,
			bookAddedSuccessfully,
			actions,
		} = this.props;

		if (bookAddedSuccessfully) {
			return (
				<BookAddedSuccessfully
					onUnmount={actions.removeBookAddedFlag}
					onAddAnotherBook={this.redirectToGenres}
				/>
			);
		}

		if (!initialized) {
			return null;
		}

		return (
			<Fragment>
				<StepsIndicator
					steps={determineCurrentSteps(selectedSubgenreId, isAddNewSubgenreSelected)}
					activeStepIndex={isAddNewSubgenreSelected ? 3 : 2}
				/>
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
						disabledRight={addingBookAsync || !this.isFormValid()}
					/>
					{addingBookAsync && (<AddingBookSpinner />)}
				</ContentWrapper>
			</Fragment>
		);
	}
}

BookInformation.propTypes = {
	match: PropTypes.shape({}).isRequired,
	history: PropTypes.shape({}).isRequired,
	genres: PropTypes.shape({}).isRequired,
	newBook: PropTypes.shape({}).isRequired,
	actions: PropTypes.shape({}).isRequired,
	selectedGenreId: PropTypes.number,
	selectedSubgenreId: PropTypes.number,
	isAddNewSubgenreSelected: PropTypes.bool,
	addingBookAsync: PropTypes.bool.isRequired,
	bookAddedSuccessfully: PropTypes.bool,
};

BookInformation.defaultProps = {
	selectedGenreId: null,
	selectedSubgenreId: null,
	isAddNewSubgenreSelected: false,
	bookAddedSuccessfully: null,
};

function mapStateToProps(state) {
	return {
		genres: state.getIn(['books', 'data', 'genres']),
		selectedGenreId: state.getIn(['books', 'selectedGenreId']),
		selectedSubgenreId: state.getIn(['books', 'selectedSubgenreId']),
		isAddNewSubgenreSelected: state.getIn(['books', 'isAddNewSubgenreSelected']),
		newBook: state.getIn(['books', 'newBook']),
		addingBookAsync: state.getIn(['books', 'addingBookAsync']),
		bookAddedSuccessfully: state.getIn(['books', 'bookAddedSuccessfully']),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: customBindActionCreators({
			selectGenre,
			selectSubgenre,
			addSubgenre,
			setNewBookData,
			addBookAsync,
			removeBookAddedFlag,
		}, dispatch),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookInformation));
