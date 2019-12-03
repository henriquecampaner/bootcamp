import { takeLatest, put, all } from 'redux-saga/effects';
import { enrollmentSuccess } from './actions';

export function* enrollmentDetails(data) {
  yield put(enrollmentSuccess(data));
}

export default all([
  takeLatest('@enrollment/ENROLLMENT_REQUEST', enrollmentDetails),
]);
