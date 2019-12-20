import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
`;

export const Left = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #444444;
  text-align: left;
  font-weight: bold;
`;

export const Right = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #666666;
  text-align: right;
`;
