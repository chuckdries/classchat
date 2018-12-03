import React from 'react';
import { Formik, Form, Field } from 'formik';
import './conversation.css';

const Conversation = ({ messages, sendFunc}) => (
  <div className="conversation">
    <div className="message-container">
      {messages.map((msg) => <p key={msg.id}>{msg.message}</p>)}
    </div>
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, { resetForm }) => {
        sendFunc({
          message: values.message
        });
        resetForm();
      }}
    >
      {() => (
        <Form className="message-form flex">
          <span className="form-name">Anonymous beaver</span>
          <Field className="flex-auto" type="text" name="message"/>
          <input type="submit" value="send" />
        </Form>
      )}
    </Formik>
  </div>
);

export default Conversation;
