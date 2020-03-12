import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, Logo, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [studentId, setStudentId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = () => {
    dispatch(signInRequest(studentId));
  };
  return (
    <Container>
      <Logo source={logo} />
      <FormInput
        icon="perm-identity"
        placeholder="Your Id"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        value={studentId}
        onChangeText={setStudentId}
        keyboardType="number-pad"
      />
      <SubmitButton loading={loading} onPress={handleSubmit}>
        Log In
      </SubmitButton>
    </Container>
  );
}
