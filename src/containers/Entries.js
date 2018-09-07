import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeAllEntries } from '../actions';
import { withRouter } from 'react-router-dom';

class Entries extends Component {

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/entries',
      {
        method:'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    .then(resp=>resp.json())
    .then(data=>this.props.dispatch(storeAllEntries(data)))
  }

  handleClick = (id, event) => {
    this.props.history.push(`/view/${id}`);
  }

  render() {
    return (
      <div className="App">
        <div>{this.props.entries.map(entry =>
          <div onClick={(e)=>this.handleClick(entry.id, e)} key={entry.id}>{entry.title}</div>
        )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    entries: state.entry.entries
  }
}

export default withRouter(connect(
  mapStateToProps
)(Entries));
