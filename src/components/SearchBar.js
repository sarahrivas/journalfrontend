import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

const SearchBar = (props) => {

    return (
      <div className={props.classes.search}>
      <div className={props.classes.searchIcon}>
                <SearchIcon />
              </div>
      <Input onChange={props.searchBarHandler} value={props.currentInput}
              placeholder="Search…"
              disableUnderline
              classes={{
                root: props.classes.inputRoot,
                input: props.classes.inputInput,
              }}
            />
      </div>
    )
  }

const mapStateToProps = (state) => {
  return {
    user: state.user,
    entries: state.entry.entries,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(SearchBar));
