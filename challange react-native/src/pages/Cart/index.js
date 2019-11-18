import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import {
  Container,
  RenderProduct,
  Product,
  ProductDetail,
  ProductContainer,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ProductControll,
  Price,
  ProductAmount,
  FinishButton,
  FinishText,
  TotalContainer,
  TotalText,
  TotalAmount,
} from './styles';

function Cart({ cart, removeFromCart, updateAmountRequest, total }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <RenderProduct>
        <FlatList
          data={cart}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ProductContainer>
              <Product>
                <ProductImage source={{ uri: item.image }} />
                <ProductDetail>
                  <ProductTitle>{item.title}</ProductTitle>
                  <ProductPrice>{item.priceFormatted}</ProductPrice>
                </ProductDetail>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Icon name="delete-forever" size={24} color="#222" />
                </TouchableOpacity>
              </Product>

              <ProductControll>
                <TouchableOpacity onPress={() => decrement(item)}>
                  <Icon name="remove-circle-outline" size={20} color="#222" />
                </TouchableOpacity>

                <ProductAmount value={String(item.amount)} />

                <TouchableOpacity onPress={() => increment(item)}>
                  <Icon name="add-circle-outline" size={20} color="#222" />
                </TouchableOpacity>

                <Price>{item.subtotal}</Price>
              </ProductControll>
            </ProductContainer>
          )}
        />

        <TotalContainer>
          <TotalText>Total</TotalText>
          <TotalAmount>{total}</TotalAmount>
        </TotalContainer>

        <FinishButton>
          <FinishText>Finish</FinishText>
        </FinishButton>
      </RenderProduct>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
