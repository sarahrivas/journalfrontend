import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeAllEntries } from '../actions'

class Home extends Component {

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


  render() {
    return (
      <div className="App">
        <div>{this.props.entries.slice(0,6).map(entry => <div>{entry.title}</div>)}</div>
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

export default connect(
  mapStateToProps
)(Home);
