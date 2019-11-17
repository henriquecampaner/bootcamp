import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

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

function Cart({ cart }) {
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
                <Icon name="delete-forever" size={24} color="#222" />
              </Product>

              <ProductControll>
                <TouchableOpacity>
                  <Icon name="remove-circle-outline" size={20} color="#222" />
                </TouchableOpacity>

                <ProductAmount value={String(item.amount)} />

                <TouchableOpacity>
                  <Icon name="add-circle-outline" size={20} color="#222" />
                </TouchableOpacity>

                <Price>£1234</Price>
              </ProductControll>
            </ProductContainer>
          )}
        />

        <TotalContainer>
          <TotalText>Total</TotalText>
          <TotalAmount>£1230.00</TotalAmount>
        </TotalContainer>

        <FinishButton>
          <FinishText>Finish</FinishText>
        </FinishButton>
      </RenderProduct>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
