import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewEntry extends Component {
  render() {
    return (
      <div>
        Entry
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(NewEntry);
