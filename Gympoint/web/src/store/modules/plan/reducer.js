import produce from 'immer';

const INITITAL_STATE = {
  plan: null,
};

export default function user(state = INITITAL_STATE, action) {
  switch (action.type) {
    case '@plan/PLAN_SUCCESS':
      return produce(state, draft => {
        draft.plan = action.payload.data;
      });
    default:
      return state;
  }
}
