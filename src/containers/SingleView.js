import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  } from '../actions'

class SingleView extends Component {

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
    fetch('http://localhost:3001/api/v1/login', postConfig)
    .then(resp => resp.json())
    .then(data => {

      this.props.dispatch(({
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
      <div className="single-entry">

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(SingleView);
