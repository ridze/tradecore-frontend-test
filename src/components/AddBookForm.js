import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
	Form,
	Input,
	Select,
	Row,
	Col,
} from 'antd';

// Constants
import { ADD_BOOK_FORM_KEYS } from '../lib/constants/BookData';

const { Option } = Select;
const { TextArea } = Input;

const authors = ['Author1', 'Author2', 'Author3'];
const publishers = ['Publisher1', 'Publisher2', 'Publisher3'];
const formats = ['Format1', 'Format2', 'Format3'];
const languages = ['Language1', 'Language2', 'Language3'];

class AddBookForm extends PureComponent {
	handleSubmit = (e) => {
		e.preventDefault();
		const {
			onSubmit,
			form,
		} = this.props;
		form.validateFieldsAndScroll((err) => {
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
		} = this.props;

		const { getFieldDecorator } = form;

		return (
			<Form
				id={id}
				layout="vertical"
				onSubmit={this.handleSubmit}
			>
				<Form.Item label="Book Title">
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'Please input book title.', whitespace: true }],
					})(
						<Input placeholder="Book Title" />
					)}
				</Form.Item>
				<Form.Item label="Author">
					{getFieldDecorator('author', {
						rules: [{ required: true, message: 'Please select book author.' }],
					})(
						<Select placeholder="Author">
							{authors.map(author => (<Option key={author}>{author}</Option>))}
						</Select>
					)}
				</Form.Item>
				<Form.Item label="ISBN">
					{getFieldDecorator('isbn', {
						rules: [{ required: true, message: 'Please input ISBN.', whitespace: true }],
					})(
						<Input placeholder="ISBN" />
					)}
				</Form.Item>
				<Form.Item label="Publisher">
					{getFieldDecorator('publisher', {
						rules: [{ required: true, message: 'Please select book publisher.' }],
					})(
						<Select placeholder="Publisher">
							{publishers.map(publisher => (<Option key={publisher}>{publisher}</Option>))}
						</Select>
					)}
				</Form.Item>
				<Row>
					<Col span={7}>
						<Form.Item label="Date published">
							{getFieldDecorator('datePublished', {
								rules: [{ required: true, message: 'Please input book published date.', whitespace: true }],
							})(
								<Input type="date" placeholder="Date published" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={5}>
						<Form.Item label="Number of pages">
							{getFieldDecorator('numberOfPages', {
								rules: [{ required: true, message: 'Please input number of pages.', whitespace: true }],
							})(
								<Input type="number" placeholder="Number of pages" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={7}>
						<Form.Item label="Format">
							{getFieldDecorator('format', {
								rules: [{ required: true, message: 'Please select book format.' }],
							})(
								<Select placeholder="Format">
									{formats.map(format => (<Option key={format}>{format}</Option>))}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={7}>
						<Form.Item label="Edition">
							{getFieldDecorator('edition', {
								rules: [{ required: true, message: 'Please input book edition.', whitespace: true }],
							})(
								<Input placeholder="Edition" />
							)}
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item style={{ marginLeft: 10 }} label="Edition language">
							{getFieldDecorator('editionLanguage', {
								rules: [{ required: true, message: 'Please select edition language.' }],
							})(
								<Select placeholder="Edition language">
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
							placeholder="Type the description"
						/>
					)}
				</Form.Item>
			</Form>
		);
	}
}

AddBookForm.propTypes = {
	isDescriptionRequired: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	newBook: PropTypes.shape({}).isRequired,
	form: PropTypes.shape({}).isRequired,
	id: PropTypes.string.isRequired,
};

const WrappedAddBookForm = Form.create({
	name: 'addBookForm',
	onFieldsChange(props, changedFields) {
		const [key] = Object.keys(changedFields);
		if (key) {
			const { value } = changedFields[key];
			return value !== props.newBook.get(key) ? props.onFormItemChange(value, key) : false;
		}
		return false;
	},

	mapPropsToFields(props) {
		return Object.values(ADD_BOOK_FORM_KEYS).reduce((acc, key) => {
			acc[key] = Form.createFormField({ value: props.newBook.get(key) });
			return acc;
		}, {});
	},
})(AddBookForm);

export default WrappedAddBookForm;
