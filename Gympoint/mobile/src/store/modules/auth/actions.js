export function signInRequest(studentId) {
  return {
    type: '@student/SIGN_IN_REQUEST',
    payload: { studentId },
  };
}

export function signInSuccess(student) {
  return {
    type: '@student/SIGN_IN_SUCCESS',
    payload: { student },
  };
}

export function signInFailure() {
  return {
    type: '@student/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@student/SIGN_OUT',
  };
}
