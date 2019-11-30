export function SignInSuccess(token, user) {
  return {
    type: '@student/STUDENT_SUCCESS',
    payload: { token, user },
  };
}
