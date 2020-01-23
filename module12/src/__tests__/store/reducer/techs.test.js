import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/actions';

describe('Techs Reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('ADD_TECH', () => {
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.JS'));

    expect(state).toStrictEqual(['Node.JS']);
  });
})