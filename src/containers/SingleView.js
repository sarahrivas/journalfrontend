import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetEntry, deleteEntry,renderSingleEntry } from '../actions';
import { withRouter } from 'react-router';

class SingleView extends Component {

  deleteHandler = (event) => {
    console.log(this);
    const id = this.props.currentEntry.id;
    const deleteUrl = `http://localhost:3000/api/v1/entries/${id}`;
    const deleteConfig= {
      method: 'DELETE',
      headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch(deleteUrl,deleteConfig)
    .then(resp=> resp.json())
    .then(data=> {
      this.props.dispatch(deleteEntry( id: data.entryId ));
      this.props.dispatch(resetEntry());
      this.props.history.push("/entries")
    })
  }

  editHandler = (event) => {
    const id = this.props.currentEntry.id;
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
  currentEntry: state.entry.currentEntry
})

export default withRouter(connect(
  mapStateToProps
)(SingleView));
