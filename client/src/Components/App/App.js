import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import urljoin from 'url-join';
// import { Route, Switch } from 'react-router-dom';
// import io from 'socket.io-client';
// import * as R from 'ramda';
import './App.css';

// import Home from '../Home/Home';
import Nav from '../Nav/Nav';
// import NotFound from '../NotFound/NotFound';
import { API_URL } from '../../config';
// import School from '../School/School';
// import Teacher from '../Teacher/Teacher';
// import Class from '../Class/Class';
// import Conversation from '../Conversation/Conversation';

const mapStateToProps = (state) => {
  return  {
    user: state.user.currentUser,
    loggedIn: state.user.loggedIn
  };
};
class App extends Component {
  componentDidMount() {
    axios.get(urljoin(API_URL, 'validate'))
      .then((response) => {
        console.log(response);
      });
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <div id="route-container">
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
