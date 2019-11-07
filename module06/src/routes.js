import { createAppContainer } from 'react-navigation';
// fazer as configuracoes que o site manda
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';
// importar paginas

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Repository,
      // importar as rotas
    },
    {
      headerLayoutPreset: 'center',
      // mantem texto no centro
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        // para alterar todos os headers
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
      },
    }
  )
);

export default Routes;
