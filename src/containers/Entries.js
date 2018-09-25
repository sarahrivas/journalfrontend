import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SearchBar from '../components/SearchBar';

const styles = theme => ({
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
});

class Entries extends Component {

  state = {
    currentInput: "",
  }

  searchBarHandler = (event) => {
    this.setState({currentInput:event.target.value})
  }

  handleClick = (id, event) => {
    this.props.onEntryView(id);
  }


  render() {

    const filteredEntries = this.props.entries.filter(
      entry => entry.title.toLowerCase().includes(this.state.currentInput.toLowerCase())
    );

    return (
        <Fragment>
        <SearchBar searchBarHandler={this.searchBarHandler} currentInput={this.state.currentInput}/>
        <List component="nav">{filteredEntries.map(entry => <li key={entry.id}>
          <ListItem selected={this.props.currentEntry.id === entry.id} button onClick={(e)=>this.handleClick(entry.id, e)} key={entry.id}>
            <ListItemText primary={entry.title}/>
          </ListItem>
          <Divider light />
          </li>
        )}
        </List>
        </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    entries: state.entry.entries,
    currentEntry: state.entry.currentEntry
  }
}

export default withRouter(connect(
  mapStateToProps
)(Entries));
