import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import './conversation.css';
import Message from './Message';

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    loggedIn: state.user.loggedIn,
  };
};
const Conversation = ({ messages, sendFunc, loggedIn, user }) => (
  <div className="conversation">
    <div className="message-container">
      {messages.map((msg) => <Message key={msg.id} msg={msg} />)}
    </div>
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, { resetForm }) => {
        sendFunc({
          message: values.message,
          author: loggedIn ? user.name : 'Anonymous'
        });
        resetForm();
      }}
    >
      {() => (
        <Form className="message-form flex">
          <span className="form-name">{loggedIn ? user.name : 'Anonymous'}</span>
          <Field className="flex-auto" type="text" name="message"/>
          <input type="submit" value="send" />
        </Form>
      )}
    </Formik>
  </div>
);

export default connect(mapStateToProps)(Conversation);
