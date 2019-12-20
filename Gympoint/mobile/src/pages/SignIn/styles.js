import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  margin-bottom: 20px;
`;

export const LoginInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.1)',
})`
  border: 1px solid #dddddd;
  font-size: 15px;
  margin-left: 10px;
  color: #999;
`;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
