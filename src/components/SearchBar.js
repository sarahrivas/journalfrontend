import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const SearchBar = (props) => {

  return (
    <Fragment>

    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
    entries: state.entry
  };
};

export default withStyles(styles)(connect(mapStateToProps)(SearchBar));
