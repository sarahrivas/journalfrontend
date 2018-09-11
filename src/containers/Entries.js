import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { storeAllEntries, renderSingleEntry } from '../actions';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
});

class Entries extends Component {

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
  }

  handleClick = (id, event) => {
    this.props.dispatch(renderSingleEntry(id));
    this.props.history.push(`/view/${id}`);

  }

  render() {
    return (
      <Fragment>
        <List component="nav">{this.props.entries.map(entry =>
          <ListItem button onClick={(e)=>this.handleClick(entry.id, e)} key={entry.id}>
          <ListItemText primary={entry.title}/>
          </ListItem>
        )}
        </List>
      </Fragment>
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
