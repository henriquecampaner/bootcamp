import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Wrapper, Container, Logo, BasketContainer, ItemCart } from './styles';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);
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

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
