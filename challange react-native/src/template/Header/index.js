import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Wrapper, Container, Logo, BasketContainer, ItemCart } from './styles';

function Header({ navigation, cartSize }) {
  return (
    <>
      <Wrapper>
        <Container>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Logo />
          </TouchableOpacity>
          <BasketContainer onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" color="#fff" size={24} />
            <ItemCart>{cartSize}</ItemCart>
          </BasketContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
