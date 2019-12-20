import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  margin: 20px;
  margin-top: 60px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex: 1;
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
`;

export const Left = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Right = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 14px;
  color: #666666;
  text-align: right;
`;

export const Question = styled.ScrollView`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Content = styled.Text`
  flex: 1;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: justify;
  padding-right: 5px;
`;

export const Answer = styled.ScrollView`
  margin-bottom: 16px;
`;
