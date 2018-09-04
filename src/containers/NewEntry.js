import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewEntry extends Component {

  state = {
    title: '',
    content: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // add post for entry
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label>
          Content:
          <textarea type="text" name="content" value={this.state.content} onChange={this.handleChange} />
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
)(NewEntry);
