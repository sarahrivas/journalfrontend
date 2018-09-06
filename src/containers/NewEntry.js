import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitNewForm } from '../actions'


class NewEntry extends Component {

  state = {
    title: '',
    content: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const postConfig = {
      method: 'POST',
      body: JSON.stringify({
        entry: {
          title: this.state.title,
          content: this.state.content,
          user_id: this.props.user.id
        }
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch('http://localhost:3001/api/v1/entries', postConfig)
    .then(resp => resp.json())
    .then(data => {

      this.props.dispatch(submitNewForm({
        title: data.title,
        content: data.content
      }));

    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label>
          Content:
          <textarea type="text" name="content" value={this.state.content} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entry: state.entry,
  user: state.user
})

export default connect(
  mapStateToProps
)(NewEntry);
