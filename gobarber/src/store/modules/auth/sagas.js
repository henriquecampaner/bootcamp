import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import { signInSuccess, signFaliure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    // payload vindo do actions
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    // chamada api para a rota sessions, onde vou informar senha e email

    const { token, user } = response.data;
    // como resposta, recebo o token e o user

    if (user.provider) {
      Alert.alert('Login Error', 'User can not be a provider');
      return;
    }
    // se o usuario nao for um provider, ERRO

    api.defaults.headers.Authorization = `Bearer ${token}`;
    // coloca o token no header, para assim poder acessar as outras rotas

    yield put(signInSuccess(token, user));
    // dispatch a funcao com o token e o usuario que era solicitado la nas actions

    // history.push('/dashboard');
    // apos fazer a validacao, o user e redirecionado para dashboard
  } catch (err) {
    Alert.alert('Authentication failed', 'incorrect email or password');
    yield put(signFaliure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert('Registration failed', 'check your details');
    yield put(signFaliure);
  }
}

export function setToken({ payload }) {
  // funcao para armazedar o token, msm se user fizer f5
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
