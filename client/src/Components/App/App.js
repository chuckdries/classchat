import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import * as R from 'ramda';
import './App.css';

import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import NotFound from '../NotFound/NotFound';
import { API_URL } from '../../config';
import School from '../School/School';
import Teacher from '../Teacher/Teacher';
import Class from '../Class/Class';
import Conversation from '../Conversation/Conversation';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   messages: []
    // };
    // this.sendMsg = this.sendMsg.bind(this);
  }

  // componentDidMount() {
  //   this.socket = io.connect(API_URL);
  //   this.socket.on('connect', () => {
  //     console.log("hello!");
  //     this.socket.emit('join room', 'asdf');
  //   });
  //   this.socket.on('message received', (msg) => {
  //     this.setState({
  //       messages: R.append(msg, this.state.messages)
  //     });
  //   });
  // }

  // sendMsg(msg) {
  //   this.socket.emit('message sent', msg);
  // }

  render() {
    // const {
    //   messages
    // } = this.state;
    // const {
    //   sendMsg
    // } = this;

    return (
      <div className="App">
        <Nav />
        <div id="route-container">
          {/* <Switch>
            <Route path="/class/:school/:teacher/:classcode" component={Class} />
            <Route path="/class/:school/:teacher" component={Teacher} />
            <Route path="/class/:school" component={School} />
            <Route path="/class" component={() => <h3>Class Home</h3>} />
            <Route path="/" component={NotFound} />
          </Switch> */}
          <Switch>
            <Route path="/class/:school/:classcode" component={Class} />
            <Route path="/" exact component={Home} />
          </Switch>
          {/* <Conversation messages={messages} sendFunc={sendMsg} /> */}
        </div>
      </div>
    );
  }
}

export default App;
