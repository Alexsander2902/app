import React, { Component } from 'react';
import './Main.css';

import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa';

export default class Main extends Component {
  state = {
    textField: '',
    fields: [],
    index: -1,
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    const { fields, index } = this.state;
    let { textField } = this.state;
    textField = textField.trim();

    if (fields.indexOf(textField) !== -1) return;

    const newFields = [...fields];

    if (index === -1) {
      this.setState({
        fields: [...newFields, textField],
        textField: '',
      });
    } else {
      newFields[index] = textField;

      this.setState({
        fields: [...newFields],
        index: -1,
        textField: '',
      });
    }
  };

  handleOnChange = (event) => {
    this.setState({ textField: event.target.value });
  };

  handleDelete = (event, index) => {
    const { fields } = this.state;
    const newFiels = [...fields];
    newFiels.splice(index, 1);

    this.setState({ fields: [...newFiels] });
  };

  handleEdit = (event, index) => {
    const { fields } = this.state;
    this.setState({
      index,
      textField: fields[index],
    });
  };

  render() {
    const { textField, fields } = this.state;

    return (
      <div className="main">
        <h1>Lista</h1>
        <form action="#" onSubmit={this.handleOnSubmit} className="form">
          <input type="text" value={textField} onChange={this.handleOnChange} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="fields">
          {fields.map((field, index) => (
            <li key={field}>
              {field}
              <span>
                <FaEdit
                  className="edit"
                  onClick={(event) => this.handleEdit(event, index)}
                />
                <FaWindowClose
                  className="delete"
                  onClick={(event) => this.handleDelete(event, index)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
