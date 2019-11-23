import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo-vertical.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form>
        <span>YOUR EMAIL</span>
        <Input name="email" type="email" placeholder="example@email.com" />
        <span>YOUR PASSAWORD</span>
        <Input name="password" type="password" placeholder="********" />
        <button type="submit">Sign In</button>
      </Form>
    </>
  );
}
