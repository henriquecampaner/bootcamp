import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  // define o titulo dessa rota

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users === users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
      // salva no banco do celular os users
    }
  }

  handleNavigate = user => {
    const { navigation } = this.props;
    // propriedade usada para navegacao

    navigation.navigate('User', { user });
    // 1- pagina para ir
    // 2- parametros a serem utilizados (no caso props para a pagina)
  };

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });
    // seto o loading para true enquanto faz a chamada api

    const respose = await api.get(`/users/${newUser}`);

    const data = {
      name: respose.data.name,
      login: respose.data.login,
      bio: respose.data.bio,
      avatar: respose.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
      // seto para false quando terminar a chamda
    });

    Keyboard.dismiss();
    // faz o teclado sumir
  };

  static navigationOptions = {
    title: 'Users',
  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorret={false}
            autoCapitalize="none"
            placeholder="Add an user"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            // usa-se dessa maneira para pegar o dado do input

            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
            // as duas configs acima configura o botao do celular para enviar
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {/* onPress ao inves de onClick */}
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
            {/* ActivityIndicador e um button de carregamento */}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Go to profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
