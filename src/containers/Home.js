import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions'

class Home extends Component {

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/entries',
      {method:'GET', headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
    )
    .then(resp=>resp.json())
    .then(data=>console.log(data))
  }


  render() {

    return (
      <div className="App">
        <button onClick={this.newUserPost}>Add User</button>
        <div>{this.props.user.name}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(Home);
