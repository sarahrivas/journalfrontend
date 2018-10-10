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
    content: '',
    image: null,
    imageURL: null
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("title", this.state.title);
    data.append("content", this.state.content);
    data.append("image", this.state.image);
    data.append("user_id", this.props.user.id);

    fetch('http://localhost:3000/api/v1/entries', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: data
    })
    .then(resp => resp.json())
    .then(data => {
      this.props.dispatch(submitNewForm({
        title: data.title,
        content: data.content,
        id: data.id,
        image: data.image
      }));
      this.props.history.push(`/view/${data.id}`)
    }, this.setState({imageURL: data.url}))
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFileUpload = event => {
    this.setState({
      image: event.target.files[0]
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
            <input type="file" onChange={this.handleFileUpload} />
            <input type="submit" value="Submit" className={this.props.classes.button} />
        </form>
        {!!this.state.imageURL ? <img src={this.state.imageURL} alt="img"/> : null}
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
