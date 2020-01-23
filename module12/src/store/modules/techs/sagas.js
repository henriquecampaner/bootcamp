import { call, put } from 'redux-saga/effects';

import api from '../../../services/api';

import { getTechsSuccess, getTechsFaliure } from './actions';

export function* getTechs() {
  try {
    const response = yield call(api.get, 'techs');

    yield put(getTechsSuccess(response.data));
  } catch (err) {
    yield put(getTechsFaliure());
  }
}