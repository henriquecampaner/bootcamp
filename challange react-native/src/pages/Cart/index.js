import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function Cart() {
  const DATA = [
    {
      id: 1,
      image:
        'https://static.netshoes.com.br/produtos/tenis-sneaker-esportivo-running-leve-calce-facil-unissex-vr/06/E74-0492-006/E74-0492-006_detalhe2.jpg?ims=326x',
      title: 'First Item ewpopoewroprwe',
      price: 123,
    },
    {
      id: 2,
      image:
        'https://static.netshoes.com.br/produtos/tenis-sneaker-esportivo-running-leve-calce-facil-unissex-vr/06/E74-0492-006/E74-0492-006_detalhe2.jpg?ims=326x',
      title: 'Second Item',
      price: 123,
    },
  ];

  return (
    <Container>
      <RenderProduct>
        <FlatList
          data={DATA}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ProductContainer>
              <Product>
                <ProductImage source={{ uri: item.image }} />
                <ProductDetail>
                  <ProductTitle>{item.title}</ProductTitle>
                  <ProductPrice>{item.price}</ProductPrice>
                </ProductDetail>
                <Icon name="delete-forever" size={24} color="#222" />
              </Product>

              <ProductControll>
                <TouchableOpacity>
                  <Icon name="remove-circle-outline" size={20} color="#222" />
                </TouchableOpacity>

                <ProductAmount value="2" />

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
