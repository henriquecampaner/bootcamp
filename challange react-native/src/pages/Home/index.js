import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
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

class Home extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  };

  handleAddProduct = product => {
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  render() {
    const { products } = this.state;

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
                  onPress={() => this.handleAddProduct(item)}
                >
                  <ProductBasket>
                    <Icon name="add-shopping-cart" color="#fff" size={20} />
                    <TextAmount>2</TextAmount>
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
}

export default connect()(Home);
