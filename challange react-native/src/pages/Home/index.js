import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
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

import * as CartActions from '../../store/modules/cart/actions';

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

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

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
                  onPress={() => this.handleAddProduct(item.id)}
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
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
