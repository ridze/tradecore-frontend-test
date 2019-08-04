import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
	Form,
	Input,
	Select,
	Row,
	Col,
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const authors = ['Author1', 'Author2', 'Author3'];
const publishers = ['Publisher1', 'Publisher2', 'Publisher3'];
const formats = ['Format1', 'Format2', 'Format3'];
const languages = ['Language1', 'Language2', 'Language3'];

class AddBookForm extends PureComponent {
	constructor(props) {
		super(props);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {
			onSubmit,
		} = this.props;
		this.props.form.validateFieldsAndScroll((err) => {
			if (!err) {
				onSubmit();
			}
		});
	};

	render() {
		const {
			form,
			id,
			isDescriptionRequired,
			onFormItemChange,
			newBook,
		} = this.props;

		const { getFieldDecorator } = form;

		return (
			<Form
				id={id}
				layout="vertical"
				onSubmit={this.handleSubmit}
			>
				<Form.Item label="Book Title">
					{getFieldDecorator('bookTitle', {
						rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
					})(
						<Input
							onChange={event => onFormItemChange(event.target.value, 'title')}
							placeholder="Book Title"
							defaultValue={newBook.get('title')}
						/>
					)}
				</Form.Item>
				<Form.Item label="Author">
					{getFieldDecorator('author', {
						rules: [
							{ required: true, message: 'Please select your habitual residence!' },
						],
					})(
						<Select
							onChange={value => onFormItemChange(value, 'author')}
							placeholder="Author"
							defaultValue={newBook.get('author')}
						>
							{authors.map(author => (
								<Option key={author}>{author}</Option>
							))}
						</Select>
					)}
				</Form.Item>
				<Form.Item label="ISBN">
					{getFieldDecorator('isbn', {
						rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
					})(
						<Input
							onChange={event => onFormItemChange(event.target.value, 'isbn')}
							placeholder="ISBN"
							defaultValue={newBook.get('isbn')}
						/>
					)}
				</Form.Item>
				<Form.Item label="Publisher">
					{getFieldDecorator('publisher', {
						rules: [
							{ required: true, message: 'Please select your habitual residence!' },
						],
					})(
						<Select
							onChange={value => onFormItemChange(value, 'publisher')}
							placeholder="Publisher"
							defaultValue={newBook.get('publisher')}
						>
							{publishers.map(publisher => (
								<Option key={publisher}>{publisher}</Option>
							))}
						</Select>
					)}
				</Form.Item>
				<Row>
					<Col span={7}>
						<Form.Item label="Date published">
							{getFieldDecorator('datePublished', {
								rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
							})(
								<Input
									onChange={event => onFormItemChange(event.target.value, 'datePublished')}
									type="date"
									placeholder="Date published"
									defaultValue={newBook.get('datePublished')}
								/>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={5}>
						<Form.Item label="Number of pages">
							{getFieldDecorator('numberOfPages', {
								rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
							})(
								<Input
									onChange={event => onFormItemChange(event.target.value, 'numberOfPages')}
									type="number"
									placeholder="Number of pages"
									defaultValue={newBook.get('numberOfPages')}
								/>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={7}>
						<Form.Item label="Format">
							{getFieldDecorator('format', {
								rules: [
									{ required: true, message: 'Please select your habitual residence!' },
								],
							})(
								<Select
									onChange={value => onFormItemChange(value, 'format')}
									placeholder="Format"
									defaultValue={newBook.get('format')}
								>
									{formats.map(format => (
										<Option key={format}>{format}</Option>
									))}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={7}>
						<Form.Item label="Edition">
							{getFieldDecorator('edition', {
								rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
							})(
								<Input
									onChange={event => onFormItemChange(event.target.value, 'edition')}
									placeholder="Edition"
									defaultValue={newBook.get('edition')}
								/>
							)}
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item style={{ marginLeft: 10 }} label="Edition language">
							{getFieldDecorator('editionLanguage', {
								rules: [
									{ required: true, message: 'Please select your habitual residence!' },
								],
							})(
								<Select
									onChange={value => onFormItemChange(value, 'editionLanguage')}
									placeholder="Edition language"
									defaultValue={newBook.get('editionLanguage')}
								>
									{languages.map(language => (
										<Option key={language}>{language}</Option>
									))}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="Description">
					{getFieldDecorator('description', {
						rules: [{ required: isDescriptionRequired, message: 'Description is required for this book.', whitespace: true }],
					})(
						<TextArea
							autosize
							onChange={event => onFormItemChange(event.target.value, 'description')}
							placeholder="Type the description"
							defaultValue={newBook.get('description')}
						/>
					)}
				</Form.Item>
			</Form>
		);
	}
}

const WrappedAddBookForm = Form.create({ name: 'addBookForm' })(AddBookForm);

WrappedAddBookForm.propTypes = {
	isDescriptionRequired: PropTypes.bool.isRequired,
	onFormItemChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	newBook: PropTypes.shape({}).isRequired,
};

export default WrappedAddBookForm;
