/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
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
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    const respose = await api.get(`/users/${newUser}`);

    const data = {
      name: respose.data.name,
      login: respose.data.login,
      bio: respose.data.bio,
      avatar: respose.data.avatar_url,
    };

    this.setState({
      user: [...users, data],
      newUser: '',
    });

    Keyboard.dismiss();
    // faz o teclado sumir
  };

  render() {
    const { users, newUser } = this.state;

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
          <SubmitButton onPress={this.handleAddUser}>
            {/* onPress ao inves de onClick */}
            <Icon name="add" size={20} color="#fff" />
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

              <ProfileButton onPress={() => {}}>
                <ProfileButtonText>Go to profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Users',
};
// define o titulo dessa rota
