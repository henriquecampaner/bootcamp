import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  margin: 20px;
  margin-top: 60px;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

export const InputContainer = styled.View`
  padding: 5px 15px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex: 0.7;
  align-self: stretch;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const NewOrderInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  line-height: 26px;
  text-align: justify;
  font-size: 16px;
  color: #333;
  text-align: justify;
`;

export const NewHelpOrderButton = styled(Button)`
  margin-top: 20px;
  align-self: stretch;
`;
