import React, { Component } from 'react';
import Entries from './Entries';

class MainEntryView extends Component {
  render() {
    return (
      <div>
        <Entries />
        {this.props.content}
      </div>
    );
  }
}

export default MainEntryView;
