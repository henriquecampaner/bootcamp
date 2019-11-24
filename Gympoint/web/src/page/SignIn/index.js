import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { SignInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-vertical.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Valid email required')
    .required('You need to enter your email'),
  password: Yup.string().required('Password Required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handdleSubmit({ email, password }) {
    dispatch(SignInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form schema={schema} onSubmit={handdleSubmit}>
        <p>YOUR EMAIL</p>
        <Input name="email" type="email" placeholder="example@email.com" />

        <p>YOUR PASSAWORD</p>
        <Input name="password" type="password" placeholder="********" />

        <button type="submit">{loading ? 'Loading...' : 'Sign In'}</button>
      </Form>
    </>
  );
}
