import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { logIn, logOut } from './actions';
import { withRouter } from 'react-router';
import Home from './containers/Home';
import Entries from './containers/Entries';
import NewEntry from './containers/NewEntry';
import LoginScreen from './containers/LoginScreen'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from './components/Navbar';
import SingleView from './containers/SingleView';
import EditEntry from './containers/EditEntry';
import MainEntryView from './containers/MainEntryView';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const username = localStorage.getItem('username');
      const name = localStorage.getItem('name');
      const id = localStorage.getItem('id');
      this.props.dispatch(logIn({ token, username, name, id }));
    }
  }

  handleLogOut = () => {
    this.props.dispatch(logOut());
  }

  render() {

    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Navbar handleClick={this.handleLogOut} />
          </Grid>
            {
              this.props.user.name ?
                <Fragment>
                  <Route exact path="/" component={Home} />
                  <Route path="/new-entry" component={NewEntry} />
                  <Route path="/edit/:id" component={EditEntry} />
                  <Route path="/entries" render={() => <MainEntryView content={<div>Select an entry</div>} />} />
                  <Route path="/view/:id" render={() => <MainEntryView content={<SingleView />} />} />
                </Fragment>
                : <LoginScreen />
            }
          </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(App)));
