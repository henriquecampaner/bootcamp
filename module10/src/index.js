import React from 'react';
import { StatusBar } from 'react-native';
import './config/Reactotronconfig';
import Routes from './routes';

// import Test from '~/Test';

// import { Container } from './styles';

export default function src() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
