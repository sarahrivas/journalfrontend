import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editEntry } from '../actions';
import { withRouter } from 'react-router';


class EditEntry extends Component {

  state = {
    title: this.props.currentEntry.title,
    content: this.props.currentEntry.content
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.currentEntry.id;
    const editUrl = `http://localhost:3000/api/v1/entries/${id}`;
    console.log(editUrl)
    const editConfig = {
      method:'PATCH',
      body: JSON.stringify({
        currentEntry: {
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
      fetch(editUrl, editConfig)
      .then(resp => resp.json())
      .then(data => {
        this.props.dispatch(editEntry(data));
        this.props.history.push(`/view/${data.id}`)
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
          <input type="text" name="title" placeholder={this.state.title} value={this.state.title} onChange={this.handleChange} />
        </label>
        <label>
          Content:
          <textarea type="text" name="content" placeholder={this.state.content} value={this.state.content} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentEntry: state.entry.currentEntry,
  entry: state.entry,
  user: state.user
})

export default withRouter(connect(
  mapStateToProps
)(EditEntry));
