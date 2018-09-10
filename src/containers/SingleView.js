import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editEntry, resetEntry, deleteEntry,renderSingleEntry } from '../actions';
import { withRouter } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';


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
    this.props.history.push(`/edit/${id}`)
  }

  render() {

    return (
      <div className="single-entry">
        {this.props.currentEntry.title}
        {this.props.currentEntry.content}
          <button onClick={this.deleteHandler}><DeleteIcon/></button>
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
