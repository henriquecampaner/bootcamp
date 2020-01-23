import { runSaga } from 'redux-saga';
import { getTechs } from '~/store/modules/techs/sagas';
import { getTechsSuccess, getTechsFaliure } from '~/store/modules/techs/actions' 

import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

const apiMock = new MockAdapter(api);

describe('Techs saga', () => {
  it('should be able to fetch techs', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(200, ['Node.js']);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']))
    
  });

  it('should fail when api return error', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(500);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFaliure())
  });
})