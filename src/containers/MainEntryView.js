import React, { Component, Fragment } from 'react';
import Entries from './Entries';
import Grid from '@material-ui/core/Grid';

class MainEntryView extends Component {
  render() {
    return (
      <Fragment>

         <Grid item xs={12} sm={3}>
            <Entries />
          </Grid>
          <Grid item xs={12} sm={9}>
            {this.props.content}
          </Grid>

      </Fragment>
    );
  }
}

export default MainEntryView;
