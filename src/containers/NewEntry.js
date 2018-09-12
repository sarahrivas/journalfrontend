import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { submitNewForm } from '../actions';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
  contentArea: {
    'margin-bottom': '12px'
  },
  button: {
    display: 'block',
    float: 'right',
    'margin-right': '5%',
    'margin-bottom': '3%'
  },
  recipeCard: {
    width: '100%'
  }
});

class NewEntry extends Component {

  state = {
    title: '',
    content: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const postConfig = {
      method: 'POST',
      body: JSON.stringify({
        entry: {
          title: this.state.title,
          content: this.state.content,
          user_id: this.props.user.id
        }
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch('http://localhost:3000/api/v1/entries', postConfig)
    .then(resp => resp.json())
    .then(data => {
      this.props.dispatch(submitNewForm({
        title: data.title,
        content: data.content,
        id: data.id
      }));
      this.props.history.push(`/view/${data.id}`)
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
        <Card className={this.props.classes.recipeCard}>
          <Typography variant="title" noWrap>Add a new recipe</Typography>
          <form onSubmit={this.handleSubmit}>
            <CardHeader
              title={
                <TextField
                  id="text-field-controlled"
                  value={this.state.title}
                  onChange={this.handleChange}
                  name="title"
                  label="Recipe Title"
              />}
            />
            <CardContent>
            <TextField
              label="Recipe Details"
              id="text-field-controlled"
              multiline
              value={this.state.content}
              autoFocus
              onChange={this.handleChange}
              name="content"
              className={this.props.classes.contentArea}
              fullWidth
            />
            </CardContent>
            <input type="submit" value="Submit" className={this.props.classes.button} />
        </form>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  entry: state.entry,
  user: state.user
})

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(NewEntry)));
