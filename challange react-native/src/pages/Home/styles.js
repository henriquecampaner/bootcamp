import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  background: #191920;
  flex: 1;
`;

export const ProductContainer = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 220px;
`;
export const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const ProductTitle = styled.Text`
  margin: 10px 0;
  font-size: 18px;
`;

export const ProductPrice = styled.Text`
  margin: 14px 0px;
  font-size: 20px;
  margin-bottom: 14px;
  font-weight: bold;
`;

export const ProductButton = styled.TouchableOpacity`
  flex-direction: row;
  background: #7159c1;
  border-radius: 4px;
  align-items: center;
  margin-top: auto;
`;

export const ProductBasket = styled.View`
  padding: 12px;
  background: ${darken(0.03, '#7159c1')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const TextAmount = styled.Text`
  color: #fff;
  font-size: 13px;
`;

export const TextAdd = styled.Text`
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
`;
