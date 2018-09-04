import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { logIn, logOut } from './actions';
import { withRouter } from 'react-router';
import Home from './containers/Home';
import NewEntry from './containers/NewEntry';
import LoginScreen from './containers/LoginScreen'
import { Route } from "react-router-dom";

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const username = localStorage.getItem('username');
      const name = localStorage.getItem('name');

      this.props.dispatch(logIn({ token, username, name }));
    }
  }

  handleLogOut = () => {
    this.props.dispatch(logOut());
  }

  render() {

    return (
      <div className="App">
        <h1 className="App-title">Time Capsule</h1>
        <button onClick={this.handleLogOut}>Log Out</button>
        {
          this.props.user.name ?
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/new-entry" component={NewEntry} />
            </div>
            : <LoginScreen />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(connect(
  mapStateToProps
)(App));
