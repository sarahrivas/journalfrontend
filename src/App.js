import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users', {method:'GET', headers: {Authorization: `Bearer<token>`}})
    .then(resp=>resp.json())
    .then(data=>console.log(data))
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

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.newUserPost}>Add User</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
