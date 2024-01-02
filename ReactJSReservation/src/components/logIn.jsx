// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './logIn.module.css'; // Import the CSS module

const LoginForm = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className={styles.loginBody}>
      <div className={styles.background}>
        <div className={`${styles.shape} ${styles.background}`}></div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
          <div>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <Field type="text" id="username" name="username" className={styles.input} />
            <ErrorMessage name="username" component="div" className={styles.error} />
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <Field type="password" id="password" name="password" className={styles.input} />
            <ErrorMessage name="password" component="div" className={styles.error} />
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
