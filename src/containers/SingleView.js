import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderSingleEntry } from '../actions'

class SingleView extends Component {


  render() {

    return (
      <div className="single-entry">
        {this.props.currentEntry.title}
        {this.props.currentEntry.content}
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
