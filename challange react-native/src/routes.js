import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import Cart from './pages/Cart';

import Header from './template/Header';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      headerBackTitleVisible: false,
      defaultNavigationOptions: navigation => ({
        header: <Header {...navigation} />,
      }),
      cardStyle: '#191920',
    }
  )
);

export default Routes;
