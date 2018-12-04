import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import urljoin from 'url-join';
import { Route, Switch } from 'react-router-dom';
// import io from 'socket.io-client';
// import * as R from 'ramda';
import './App.css';

import Home from '../Home/Home';
import Nav from '../Nav/Nav';
// import NotFound from '../NotFound/NotFound';
import { API_URL } from '../../config';
import { setUserData } from '../../Domain/Users/UsersActions';
// import School from '../School/School';
// import Teacher from '../Teacher/Teacher';
import Class from '../Class/Class';
import Login from './Login';
import Register from './Register';
// import Conversation from '../Conversation/Conversation';

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    loggedIn: state.user.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (data) => dispatch(setUserData(data))
  };
};

class App extends Component {
  componentDidMount() {
    axios(urljoin(API_URL, 'validate'), {
      method: 'get',
      withCredentials: true
    })
      .then((response) => {
        this.props.setUserData(response.data);
      });
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <div id="route-container">
          <Switch>
            <Route path="/class/:school/:classcode" exact component={Class} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
