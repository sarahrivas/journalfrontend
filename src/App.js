import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { logIn, logOut } from './actions';
import { withRouter } from 'react-router';
import Home from './containers/Home';
import Entries from './containers/Entries';
import NewEntry from './containers/NewEntry';
import LoginScreen from './containers/LoginScreen'
import SignUp from './containers/SignUp'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from './components/Navbar';
import SingleView from './containers/SingleView';
import EditEntry from './containers/EditEntry';
import MainEntryView from './containers/MainEntryView';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
      this.props.history.push('/')
    }
  }

  handleLogOut = () => {
    this.props.dispatch(logOut());
    this.props.history.push('/')
  }

  render() {

    const loggedIn = this.props.user.name;
    const redirectToLogin = (component) => {
      return () => (
        !loggedIn ? (
          <Redirect to="/login"/>
        ) : (
          component
        )
      )
    };

    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Navbar handleClick={this.handleLogOut} />
          </Grid>
            <Fragment>
                <Route exact path="/"
                  render={redirectToLogin(<Home />)}
                />
                <Route path="/new-entry" render={redirectToLogin(<NewEntry
                   />)} />
                <Route path="/edit/:id" render={redirectToLogin(<EditEntry />)} />
                <Route path="/entries" render={
                  redirectToLogin(
                    <MainEntryView content={
                      <Typography variant="headline" gutterBottom>
                  Select an entry
                  </Typography>} />)} />
                <Route path="/view/:id" render={
                  redirectToLogin(
                    <MainEntryView content={<SingleView />} />)} />
                <Route path="/login" render={() => <LoginScreen />} />
                <Route path="/sign-up" render={() => <SignUp />} />
            }
            </Fragment>
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
