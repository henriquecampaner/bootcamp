import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFaliure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    // eslint-disable-next-line prefer-object-spread
    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );
    // Object.assign = unir dois objetos

    const response = yield call(api.put, 'users', profile);
    Alert.alert('Success!', 'Profile updated successfully');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Error updating profile', 'confirm your information');
    yield put(updateProfileFaliure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
