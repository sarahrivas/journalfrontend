import React, { Component, Fragment } from 'react';
import Entries from './Entries';
import Grid from '@material-ui/core/Grid';
import { renderSingleEntry, storeAllEntries } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class MainEntryView extends Component {
  componentDidMount() {
      fetch('http://localhost:3000/api/v1/entries',
        {
          method:'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(resp=>resp.json())
      .then(data=>this.props.dispatch(storeAllEntries(data)))
      .then(() => {
        if (this.props.location.pathname.includes('/view')) {
          this.props.dispatch(renderSingleEntry(parseInt(this.props.match.params.id), 10));
        }
      })
  }

  handleSingleEntryView = (id) => {
    this.props.dispatch(renderSingleEntry(id));
    this.props.history.push(`/view/${id}`);
  }

  render() {
    return (
      <Fragment>

         <Grid item xs={12} sm={3}>
            <Entries onEntryView={this.handleSingleEntryView} />
          </Grid>
          <Grid item xs={12} sm={9}>
            {this.props.content}
          </Grid>

      </Fragment>
    );
  }
}



export default withRouter(connect()(MainEntryView));
