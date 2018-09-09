import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions'

class LoginScreen extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const postConfig = {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      }),
      headers:{
        'Content-type': 'application/json'
      }
    }
    fetch('http://localhost:3000/api/v1/login', postConfig)
    .then(resp => resp.json())
    .then(data => {

      this.props.dispatch(logIn({
        username: data.user.username,
        name: data.user.name,
        id: data.user.id,
        token: data.jwt
      }));
    })
  }

  // handleChange = (inputType, event) => {
  //   this.setState({
  //     [inputType]: event.target.value
  //   })
  // }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
        <label className="login-label">
          Username:
          <input type="text" name= "username" value={this.state.username} onChange={(event)=>this.handleChange(event)} />
        </label>
        <label className="login-label">
          Password:
          <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(LoginScreen);
