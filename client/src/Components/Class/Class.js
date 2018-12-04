import React from 'react';
import io from 'socket.io-client';
import * as R from 'ramda';
import axios from 'axios';
import urljoin from 'url-join';
import { connect } from 'react-redux';

import { API_URL } from '../../config';
import Conversation from '../Conversation/Conversation';


const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    loggedIn: state.user.loggedIn,
  };
};
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      fetched: false,
    };
    const { params } = this.props.match;
    this.room = `${params.school.toLowerCase()}/${params.classcode.toLowerCase()}`;
    this.sendMsg = this.sendMsg.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
  }

  componentDidMount() {
    this.socket = io.connect(API_URL);
    this.socket.on('connect', () => {
      this.socket.emit('join room', this.room);
    });
    this.socket.on('message received', (msg) => {
      // console.log(msg);
      this.setState({
        messages: R.append(msg, this.state.messages)
      });
    });
    this.fetchMessages();
  }

  componentDidUpdate() {
    this.fetchMessages();
  }

  fetchMessages() {
    if (this.props.loggedIn && !this.state.fetched) {
      console.log('fetch conversation!');
      const { params } = this.props.match;
      axios(urljoin(API_URL, 'conversation', params.school, params.classcode), {
        method: 'get',
      })
        .then(response => {
          this.setState({
            messages: R.sortBy(R.prop('date'), R.concat(this.state.messages, response.data)),
            fetched: true,
          });
        });
    }
  }

  sendMsg(msg) {
    const newMsg = {
      ...msg,
      date: Date.now(),
      room: this.room,
    };
    console.log(newMsg);
    this.socket.emit('message sent', newMsg);
  }
  render() {
    const {
      messages
    } = this.state;
    const {
      sendMsg
    } = this;
    return (
      <Conversation messages={messages} sendFunc={sendMsg} />
    );
  }
}

export default connect(mapStateToProps)(Class);