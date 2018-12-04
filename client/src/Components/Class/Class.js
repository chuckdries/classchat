import React from 'react';
import io from 'socket.io-client';
import * as R from 'ramda';

import { API_URL } from '../../config';
import Conversation from '../Conversation/Conversation';

class Class extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    const { params } = this.props.match;
    this.room = `${params.school.toLowerCase()}/${params.classcode.toLowerCase()}`;
    this.sendMsg = this.sendMsg.bind(this);
  }

  componentDidMount() {
    this.socket = io.connect(API_URL);
    this.socket.on('connect', () => {
      this.socket.emit('join room', this.room);
    });
    this.socket.on('message received', (msg) => {
      console.log(msg);
      this.setState({
        messages: R.append(msg, this.state.messages)
      });
    });
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

export default Class;