import React from 'react';
import { Link } from "react-router-dom";
import './Nav.css';

const Nav = React.memo(() => {
  return (
    <nav>
      <h1>ClassChat</h1>
      <ul>
        <li><Link to="/class/asu/">one</Link></li>
        <li>two</li>
        <li>three</li>
        <li>four</li>
      </ul>
    </nav>
  );
});

export default Nav;