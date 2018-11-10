import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import NotFound from '../NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div id="route-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
