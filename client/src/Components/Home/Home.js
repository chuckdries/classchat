import React from 'react';
import { Formik, Form, Field } from 'formik';

const Home = ({ history }) => (
  <div>
    <h1>Welcome to ClassChat.</h1>
    <Formik
    initialValues={{ school: '', classcode: '' }}
    onSubmit={(values, { resetForm }) => {
      history.push(`/class/${values.school.toLowerCase()}/${values.classcode.toLowerCase()}`);
    }}
  >
    {() => (
      <Form className="message-form">
        <Field type="text" name="school" placeholder="school"/>
        <Field type="text" name="classcode" placeholder="class"/>
        <input type="submit" value="go" />
      </Form>
    )}
  </Formik>
  </div>
);

export default Home;