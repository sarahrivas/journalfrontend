import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

class SignUp extends Component {

  state = {
    username: '',
    password: '',
    name: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const postConfig = {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          name: this.state.name
        }
      }),
      headers:{
        'Content-type': 'application/json'
      }
    }
    fetch('http://localhost:3000/api/v1/users', postConfig)
    .then(resp => resp.json())
    .then(data => {

      this.props.dispatch(logIn({
        username: data.user.username,
        name: data.user.name,
        id: data.user.id,
        token: data.jwt
      }));
      this.props.history.push('/');
    })

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {

    return (
      <Grid item xs={12}>
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
          <label className="login-label">
            Username:
            <input type="text" name= "username" value={this.state.username} onChange={(event)=>this.handleChange(event)} />
          </label>
          <label className="login-label">
            Name:
            <input type="text" name= "name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
          </label>
          <label className="login-label">
            Password:
            <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      </Grid>
    );
  }
}

export default withRouter(connect()(SignUp));
