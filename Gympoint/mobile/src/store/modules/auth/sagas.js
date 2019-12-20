import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { studentId } = payload;

    const response = yield call(api.get, `/students/${studentId}`);

    yield put(signInSuccess(response.data));
  } catch (err) {
    Alert.alert('Login failed!', 'Student does not exists.');
    yield put(signInFailure());
  }
}

export default all([takeLatest('@student/SIGN_IN_REQUEST', signIn)]);
