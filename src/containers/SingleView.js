import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { editEntry, resetEntry, deleteEntry,renderSingleEntry, storeAllEntries } from '../actions';
import { withRouter } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class SingleView extends Component {

    state = {
      expanded: false
    };


  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChange = (event) => {
    this.props.dispatch(editEntry({ [event.target.name]: event.target.value })); 
  }

  deleteHandler = (event) => {
    console.log(this);
    const id = this.props.currentEntry.id;
    const deleteUrl = `http://localhost:3000/api/v1/entries/${id}`;
    const deleteConfig= {
      method: 'DELETE',
      headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch(deleteUrl,deleteConfig)
    .then(resp=> resp.json())
    .then(data=> {
      this.props.dispatch(deleteEntry( id: data.entryId ));
      this.props.dispatch(resetEntry());
      this.props.history.push("/entries")
    })
  }

  editHandler = (event) => {
    const id = this.props.currentEntry.id;
    this.props.history.push(`/edit/${id}`)
  }

  render() {
    if (!this.props.currentEntry.id) {
      return null;
    }

    return (
      <Fragment>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe">
              <img src="https://img.clipartxtras.com/e1f272d5006b508abb031b710400ed6a_chef-logo-clip-art-royalty-free-gograph-chef-hat-clipart-free_170-169.jpeg"/>
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.currentEntry.title}
          subheader="add date"
        />
        <CardMedia
          image="/static/images/cards/paella.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              <TextField
                id="text-field-controlled"
                multiline
                fullWidth
                value={this.props.currentEntry.content}
                autoFocus
                onChange={this.handleChange}
                name="content"
              />
            </Typography>

            <button onClick={this.deleteHandler}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
            <button onClick={this.editHandler}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></button>

          </CardContent>
        </Collapse>
      </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentEntry: state.entry.currentEntry
})

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(SingleView)));
