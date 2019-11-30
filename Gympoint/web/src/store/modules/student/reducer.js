import produce from 'immer';

const INITITAL_STATE = {
  student: null,
};

export default function user(state = INITITAL_STATE, action) {
  switch (action.type) {
    case '@auth/STUDENT_SUCCESS':
      return produce(state, draft => {
        draft.student = action.payload.student;
      });
    default:
      return state;
  }
}
