import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  // executa apenas em desenvolvimento
  const tron = Reactotron.configure({ host: '192.168.0.101' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
