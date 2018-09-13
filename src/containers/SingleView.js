import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { saveEntry, editEntry, resetEntry, deleteEntry,renderSingleEntry, storeAllEntries, likedEntry } from '../actions';
import { withRouter } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
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
import Tooltip from '@material-ui/core/Tooltip';

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
  contentArea: {
    'margin-bottom': '12px'
  },
  liked: {
    color: 'red',
  }
});

class SingleView extends Component {

    state = {
      expanded: false,
    };


  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChange = (event) => {
    this.props.dispatch(editEntry({ [event.target.name]: event.target.value }));
  }

  handleLike= () => {
    this.props.dispatch(likedEntry())
  }

  deleteHandler = (event) => {
    if (window.confirm(' Are you sure you want to delete this recipe?')) {
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
  }

  handleSave = (event) => {
    event.preventDefault();
    const id = this.props.currentEntry.id;
    const editUrl = `http://localhost:3000/api/v1/entries/${id}`;

    const editConfig = {
      method:'PATCH',
      body: JSON.stringify({
          title: this.props.currentEntry.title,
          content: this.props.currentEntry.content,
          user_id: this.props.user.id
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
      fetch(editUrl, editConfig)
      .then(resp => resp.json())
      .then(data => {
        this.props.dispatch(saveEntry(data));
      })
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
              {this.props.user.name.slice(0,1)}
            </Avatar>
          }

          title={<TextField
            id="text-field-controlled"
            value={this.props.currentEntry.title}
            onChange={this.handleChange}
            name="title"
          />}
        />
        <CardMedia
          image="https://www.flickr.com/photos/pioneerwoman/15553832768"
          title="food"
        />
        <CardContent>
        <Typography component="p">
          <img src="https://cdn.cnn.com/cnnnext/dam/assets/171027052520-processed-foods-exlarge-tease.jpg" />
        </Typography>

        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.handleLike}>
              <FavoriteIcon className={this.props.currentEntry.liked && this.props.classes.liked}/>
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

              <TextField
                id="text-field-controlled"
                multiline
                fullWidth
                value={this.props.currentEntry.content}
                autoFocus
                onChange={this.handleChange}
                name="content"
                className={this.props.classes.contentArea}
              />


            <Tooltip title="Save">
              <IconButton aria-label="Save" onClick={this.handleSave}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" onClick={this.deleteHandler}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>


          </CardContent>
        </Collapse>
      </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentEntry: state.entry.currentEntry,
  user: state.user
})

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(SingleView)));
