import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = (props) => {

  return (
    <div className="navbar">
      <NavLink activeClassName="active" exact to="/">Home</NavLink>
      <NavLink activeClassName="active" exact to="/entries">View All Capsules</NavLink>
      <NavLink activeClassName="active" exact to="/new-entry">Create New TimeCapsule</NavLink>
    </div>
  )
}

export default connect()(Navbar);
