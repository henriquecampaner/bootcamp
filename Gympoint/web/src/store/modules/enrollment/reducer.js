import produce from 'immer';

const INITITAL_STATE = {
  enrollment: null,
};

export default function user(state = INITITAL_STATE, action) {
  switch (action.type) {
    case '@enrollment/ENROLLMENT_SUCCESS':
      return produce(state, draft => {
        draft.enrollment = action.payload.data;
      });
    default:
      return state;
  }
}
