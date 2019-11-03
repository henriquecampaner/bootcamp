import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  // executa apenas em desenvolvimento
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
