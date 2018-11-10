import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Socket from 'socket.io-client';
import './App.css';

import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import NotFound from '../NotFound/NotFound';
import { API_URL } from '../../config';
import School from '../School/School';
import Teacher from '../Teacher/Teacher';
import Class from '../Class/Class';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    // this.io = Socket.connect(API_URL);
    // this.io.on('chat message', (msg) => {
    //   const newMessageArray = [...this.state.messages, msg]
    //   this.setState({
    //     messages: newMessageArray
    //   });
    // });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div id="route-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/class/:school/:teacher/:classcode" component={Class} />
            <Route path="/class/:school/:teacher" component={Teacher} />
            <Route path="/class/:school" component={School} />
            <Route path="/class" component={() => <h3>Class Home</h3>} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
