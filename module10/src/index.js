import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import './config/Reactotronconfig';

import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import { store, persistor } from './store';
import App from './App';

class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('75b00901-a90b-4007-bd13-e02efe231d9f');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    OneSignal.init('75b00901-a90b-4007-bd13-e02efe231d9f');
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <App />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

// export default CodePush({
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
// })(Index);

export default Index;
