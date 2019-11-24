import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import persistReducers from './persistReducer';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middleWares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middleWares);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
