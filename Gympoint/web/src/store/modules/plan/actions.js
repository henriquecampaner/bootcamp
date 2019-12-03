export function planRequest(data) {
  return {
    type: '@plan/PLAN_REQUEST',
    data,
  };
}
export function planSuccess(data) {
  return {
    type: '@plan/PLAN_SUCCESS',
    payload: { ...data },
  };
}
