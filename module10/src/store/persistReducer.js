import AsyncStorage from '@react-native-community/async-storage';
// import para usar o storage local(web/mobile)
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      // quem vai poder usar esses dados
      storage: AsyncStorage,
      // storage, no caso sera o localstorage
      whitelist: ['auth', 'user'],
      // nome dos reducers que vou armazenar as configuracoes
    },
    reducers
  );

  return persistedReducer;
};
