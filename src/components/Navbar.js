import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
   grow: {
   flexGrow: 1,
  },
  menuButton: {
   marginLeft: -12,
   marginRight: 20,
  },
});

const Navbar = (props) => {

  return (
    <Fragment>
      <AppBar position="static" color="default">
        <h1 className="App-title">Pin It</h1>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" align="center">
            <NavLink activeClassName="active" exact to="/">Home</NavLink>
          </Typography>
          <Typography variant="title" color="inherit" align="center">
            <NavLink activeClassName="active" exact to="/entries">Recipes</NavLink>
          </Typography>
          <Typography variant="title" color="inherit" align="center">
            <NavLink activeClassName="active" exact to="/new-entry">Add Recipe</NavLink>
          </Typography>
          <Button color="inherit" align="right" onClick={props.handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default withStyles(styles)(connect()(Navbar));
