import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

import { Wrapper, Container, Logo, BasketContainer, ItemCart } from './styles';

export default function Header({ navigation }) {
  return (
    <>
      <Wrapper>
        <Container>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Logo />
          </TouchableOpacity>
          <BasketContainer onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" color="#fff" size={24} />
            <ItemCart>2</ItemCart>
          </BasketContainer>
        </Container>
      </Wrapper>
    </>
  );
}
