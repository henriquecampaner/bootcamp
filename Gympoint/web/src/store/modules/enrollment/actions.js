export function enrollmentRequest(data) {
  return {
    type: '@enrollment/ENROLLMENT_REQUEST',
    data,
  };
}
export function enrollmentSuccess(data) {
  return {
    type: '@enrollment/ENROLLMENT_SUCCESS',
    payload: { ...data },
  };
}
