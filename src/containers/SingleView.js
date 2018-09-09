import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderSingleEntry } from '../actions'

class SingleView extends Component {

  deleteHandler = (id, event) => {
    const deleteUrl = `http://localhost:3000/api/v1/entries/${id}`;
    const deleteConfig= {
      method: 'DELETE',
      headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch(deleteUrl,deleteConfig)
    .then(resp=>resp.json())
    .then(data=>this.props.dispatch(renderSingleEntry({})))
  }

  editHandler = (id, event) => {
    const editUrl = `http://localhost:3000/api/v1/entries/${id}`;
    const editConfig = {
      method:'PATCH',
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
    fetch(editUrl, editConfig)
    .then(resp => resp.json())
    .then(data => {
      this.props.dispatch(renderSingleEntry({
        currentEntry: {
          title: data.title,
          content: data.content
        }
      }));
    })
  }

  render() {

    return (
      <div className="single-entry">
        {this.props.currentEntry.title}
        {this.props.currentEntry.content}
          <button onClick={this.deleteHandler}>Delete</button>
          <button onClick={this.editHandler}>Edit</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entry: state.entry,
  currentEntry: state.entry.currentEntry
})

export default connect(
  mapStateToProps
)(SingleView);
