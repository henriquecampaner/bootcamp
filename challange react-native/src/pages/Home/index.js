import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  ProductContainer,
  ProductImage,
  ProductButton,
  ProductTitle,
  TextAmount,
  TextAdd,
  ProductBasket,
  ProductPrice,
} from './styles';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }
    getProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <View>
        <FlatList
          horizontal
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ProductContainer>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{formatPrice(item.price)}</ProductPrice>
              <ProductButton
                title="Add Product"
                onPress={() => handleAddProduct(item.id)}
              >
                <ProductBasket>
                  <Icon name="add-shopping-cart" color="#fff" size={20} />
                  <TextAmount>{amount[item.id] || 0}</TextAmount>
                </ProductBasket>
                <TextAdd>Add</TextAdd>
              </ProductButton>
            </ProductContainer>
          )}
        />
      </View>
    </Container>
  );
}
