import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { logIn, logOut } from './actions'

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users', {method:'GET', headers: {Authorization: `Bearer<token>`}})
    .then(resp=>resp.json())
    .then(data=>console.log(data))

    this.props.dispatch(logIn({name:'Marcus', username:'mj'}));
    this.props.dispatch(logIn({name:'Marcus', username:'mj'}));
  }

  newUserPost() {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: 'mimi1',
          password: 'itme',
          name: 'Mimi'
        }
      })
    })
    .then(resp => resp.json())
    .then(console.log)
  }

  handleLogOut = () => {
    this.props.dispatch(logOut());
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Time Capsule</h1>
          <button onClick={this.handleLogOut}>Log Out</button>
        </header>
        <button onClick={this.newUserPost}>Add User</button>
        <div>{this.props.user.name}</div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(App);
