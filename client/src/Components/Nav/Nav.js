import React from 'react';
import { withRouter, matchPath, Link } from "react-router-dom";
import './Nav.css';
import { API_URL } from '../../config';
import urljoin from 'url-join';
import { connect } from 'react-redux';
import { logout } from '../../Domain/Users/UsersActions';

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    loggedIn: state.user.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const Nav = React.memo(({ location, loggedIn, user, logout }) => {
  const match = matchPath(location.pathname, {
    path: '/class/:school/:classcode'
  });
  return (
    <nav style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'auto' }}>
        <h1>ClassChat</h1>
        <h2>{match && match.params.school.toUpperCase()}</h2>
        <h3>{match && match.params.classcode.toUpperCase()}</h3>
      </div>
      {/* <ul>
        <li><Link to="/class/asu/">one</Link></li>
        <li>two</li>
        <li>three</li>
        <li>four</li>
      </ul> */}
      <div style={{ marginBottom: '1em' }}>
      {!loggedIn && (
        <div>
          <p>Log in to see this conversation's history, get easy access to all your classes, and identify yourself to your classmates.</p>
          <div><Link to="/login">Login</Link></div>
          <div><Link to="/register">Sign Up</Link></div>
        </div>)}
      {loggedIn && (<div>
        <div>Welcome, { user.name }</div>
        <div><a onClick={logout}>Log out</a></div>
      </div>)}
      </div>
    </nav >
  );
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));