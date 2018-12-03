import React from 'react';
import { Link, withRouter, matchPath } from "react-router-dom";
import './Nav.css';

const Nav = React.memo(({ location }) => {
  const match = matchPath(location.pathname, {
    path: '/class/:school/:classcode'
  });
  return (
    <nav>
      <h1>ClassChat</h1>
      <h2>{match && match.params.school.toUpperCase()}</h2>
      <h3>{match && match.params.classcode.toUpperCase()}</h3>
      {/* <ul>
        <li><Link to="/class/asu/">one</Link></li>
        <li>two</li>
        <li>three</li>
        <li>four</li>
      </ul> */}
    </nav>
  );
});

export default withRouter(Nav);