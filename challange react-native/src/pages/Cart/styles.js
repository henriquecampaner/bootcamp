import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #191920;
  padding: 20px;
`;

export const RenderProduct = styled.View`
  border-radius: 4px;
  background: #fff;
  padding: 10px;
`;

export const ProductContainer = styled.View``;

export const Product = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ProductDetail = styled.View`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
`;

export const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
`;

export const ProductPrice = styled.Text`
  font-size: 14px;
  margin-bottom: 14px;
  font-weight: bold;
`;

export const ProductControll = styled.View`
  flex-direction: row;
  align-items: center;
  background: #eee;
  padding: 8px;
  border-radius: 4px;
`;

export const Price = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: right;
`;

export const ProductAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 52px;
`;

export const FinishButton = styled.TouchableOpacity`
  background-color: #7159c1;
  padding: 12px;
  border-radius: 4px;
`;

export const FinishText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

export const TotalContainer = styled.View`
  margin-top: 30px;
`;
export const TotalText = styled.Text`
  text-align: center;
  color: #999;
  font-weight: bold;
`;
export const TotalAmount = styled.Text`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
`;
