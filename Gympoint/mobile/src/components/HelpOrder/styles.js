import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

export const Top = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Answered = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  text-align: left;
  font-weight: bold;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const Right = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 14px;
  color: #666666;
  text-align: right;
`;

export const Content = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: justify;
`;
