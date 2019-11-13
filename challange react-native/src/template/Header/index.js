import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Wrapper, Container, Logo } from './styles';

export default function Header() {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <Icon name="shopping-cart" color="#000" size={24} />
        <Text>Oi</Text>
      </Container>
    </Wrapper>
  );
}
