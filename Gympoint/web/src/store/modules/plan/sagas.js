import { takeLatest, put, all } from 'redux-saga/effects';
import { planSuccess } from './actions';

export function* planDetails(data) {
  yield put(planSuccess(data));
}

export default all([takeLatest('@plan/PLAN_REQUEST', planDetails)]);
