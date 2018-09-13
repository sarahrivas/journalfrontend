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

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

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
      <Grid item xs={12}>
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
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(LoginScreen);
