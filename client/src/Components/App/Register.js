import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import urljoin from 'url-join';
import { API_URL } from '../../config';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  };
};

const Register = ({ loggedIn, history }) => {
  if (loggedIn) {
    return <Redirect to="/" />
  }
  return (
    <Formik
      initialValues={{ email: '', name: '', password: '' }}
      onSubmit={(values, { resetForm }) => {
        axios(urljoin(API_URL, '/register'), {
          method: 'post',
          data: values,
          withCredentials: true,
        })
          .then((response) => {
            console.log(response);
            history.push('/');
          });
      }}
    >
      {() => (
        <div>
          <h1>Register.</h1>
          <Form style={{ display: 'flex', flexDirection: 'column', marginRight: '1em' }}>
            <Field type="email" name="email" placeholder="email" />
            <Field type="text" name="name" placeholder="display name" />
            <Field type="password" name="password" placeholder="password" />
            <div>
              <input type="submit" value="Register" />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default connect(mapStateToProps)(Register);